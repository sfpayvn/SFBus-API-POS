import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { BOOKING_STATUS } from '@/common/constants/status.constants';
import { PosBookingGateway } from './pos-booking.gateway';
import { BookingDocument } from '@/module/core/booking/schema/booking.schema';
import { BookingService } from '@/module/core/booking/booking-service';
import { PosBookingDto, PosBookingSortFilter, PosSearchBookingPagingRes } from './dto/pos-booking.dto';
import { plainToInstance } from 'class-transformer';
import { PosPaymentService } from '../pos-payment/pos-payment-service';
import { BookingDto } from '@/module/core/booking/dto/booking.dto';
import { PosCreateBookingDto } from './dto/pos-create-booking.dto';
import { PosUpdateBookingDto } from './dto/pos-update-booking.dto';
import { UpdateBookingDto } from '@/module/core/booking/dto/update-booking.dto';
import { PosTrackingService } from '../pos-tracking/pos-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class PosBookingService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BookingDocument.name) private readonly bookingModel: Model<BookingDocument>,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => PosPaymentService)) private readonly PosPaymentService: PosPaymentService,
    private readonly posTrackingService: PosTrackingService,
    private PosBookingGateway: PosBookingGateway,
  ) {
    this.watchChanges(); // Bắt đầu theo dõi thay đổi ngay khi dịch vụ được khởi tạo
  }

  async watchChanges() {
    try {
      // Sử dụng Change Streams của Mongoose
      const changeStream = this.bookingModel.watch();

      changeStream.on('change', async (nodeChange: any) => {
        const bookingId = nodeChange.documentKey._id;
        const changeType = nodeChange.operationType; // Loại thay đổi (insert, update, delete)

        const booking = await this.bookingService.findOne(bookingId); // Tìm booking theo ID
        if (!booking) {
          console.error(`Booking with ID ${bookingId} not found.`);
          return;
        }
        // Gọi phương thức notifyChange của BookingGateway
        this.PosBookingGateway.bookingChangeOfBusSchedule(booking, new Types.ObjectId(booking.busScheduleId));
        // Gọi phương thức notifyChange của BookingGateway
      });
    } catch (error) {
      console.error('Lỗi khi theo dõi thay đổi:', error);
    }
  }

  async create(
    posCreateBookingDto: PosCreateBookingDto[],
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
    idempotencyKey: string,
  ): Promise<PosBookingDto[]> {
    const bookingDtos = await this.bookingService.create(posCreateBookingDto, tenantId, createdBy, idempotencyKey);
    // Log tracking for booking creation
    for (const bookingDto of bookingDtos) {
      await this.posTrackingService.create(
        {
          type: TRACKING_TYPES.BOOKING_CREATED,
          platform: ROLE_CONSTANTS.POS,
          metadata: {
            bookingId: bookingDto._id,
            bookingNumber: bookingDto.bookingNumber,
            busScheduleId: bookingDto.busScheduleId,
            busRouteId: bookingDto.busRouteId,
            totalTickets: bookingDto.bookingItems.length,
          },
          createdBy: createdBy,
        },
        tenantId,
      );
    }
    return bookingDtos;
  }

  async cancelBookings(
    busScheduleId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<boolean> {
    const result = await this.bookingService.cancelBookings(busScheduleId, bookingIds, tenantId, updatedBy);

    // Log tracking for booking cancellation
    await this.posTrackingService.create(
      {
        type: TRACKING_TYPES.BOOKING_CANCELLED,
         platform: ROLE_CONSTANTS.POS,
        metadata: {
          bookingIds,
          busScheduleId,
          totalCancelled: bookingIds.length,
        },
        createdBy: updatedBy,
      },
      tenantId,
    );

    return result;
  }

  async update(
    posUpdateBookingDto: PosUpdateBookingDto,
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<PosBookingDto> {
    const bookingDto: any = await this.bookingService.update(posUpdateBookingDto as UpdateBookingDto, tenantId);
    // Log tracking for booking item update
    if (updatedBy) {
      const changes = bookingDto._oldData ? this.prepareChanges(posUpdateBookingDto, bookingDto._oldData) : null;

      // Log tracking for booking update
      await this.posTrackingService.create(
        {
          type: TRACKING_TYPES.BOOKING_UPDATED,
           platform: ROLE_CONSTANTS.POS,
          metadata: {
            bookingId: bookingDto._id,
            bookingNumber: bookingDto.bookingNumber,
            oldValue: bookingDto._oldData ? JSON.stringify(bookingDto._oldData) : null,
            newValue: JSON.stringify(bookingDto),
            changes: changes ? JSON.stringify(changes) : null,
            updatedFields: changes ? Object.keys(changes) : [],
          },
          createdBy: updatedBy,
        },
        tenantId,
      );
    }
    if (bookingDto && bookingDto._oldData) delete bookingDto._oldData;
    return bookingDto;
  }

  async updates(
    posUpdateBookingsDto: PosUpdateBookingDto[],
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<PosBookingDto[]> {
    const bookingDtos: any[] = await Promise.all(
      posUpdateBookingsDto.map((dto) => this.bookingService.update(dto as UpdateBookingDto, tenantId)),
    );

    // Prepare changes for each booking using old data from response
    const allChanges = posUpdateBookingsDto.map((dto, index) => {
      const bookingDto = bookingDtos[index];
      const changes = this.prepareChanges(dto, bookingDto._oldData);

      return {
        bookingId: dto._id,
        changes: JSON.stringify(changes),
      };
    });

    // Log tracking for bulk booking updates
    await this.posTrackingService.create(
      {
        type: TRACKING_TYPES.BOOKING_BULK_UPDATED,
         platform: ROLE_CONSTANTS.POS,
        metadata: {
          bookingIds: bookingDtos.map((b) => b._id),
          bookingNumbers: bookingDtos.map((b) => b.bookingNumber),
          totalUpdated: bookingDtos.length,
          changes: allChanges,
        },
        createdBy: updatedBy,
      },
      tenantId,
    );

    return plainToInstance(PosBookingDto, bookingDtos);
  }

  async findAllByScheduleId(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBookingDto[]> {
    const filters: PosBookingSortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: [BOOKING_STATUS.RESERVED, BOOKING_STATUS.PAID, BOOKING_STATUS.DEPOSITED, BOOKING_STATUS.COMPLETED],
    };

    filters.push(filterByStatus);

    return this.bookingService.findAllByScheduleId(busScheduleId, tenantId, filters);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BookingDto> {
    const bookingModel = await this.bookingModel.findOne({ _id: id, tenantId }).lean().exec();
    return plainToInstance(BookingDto, bookingModel);
  }

  async findAllByPaymentNumber(paymentNumber: string, tenantId: Types.ObjectId): Promise<PosBookingDto[]> {
    const bookings = await this.bookingModel.find({ paymentNumber, tenantId }).lean().exec();
    return plainToInstance(PosBookingDto, bookings);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosBookingSortFilter,
    filters: PosBookingSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchBookingPagingRes> {
    const filterByStatus = {
      key: 'status',
      value: [BOOKING_STATUS.RESERVED, BOOKING_STATUS.PAID, BOOKING_STATUS.DEPOSITED, BOOKING_STATUS.COMPLETED],
    };

    filters.push(filterByStatus);

    return this.bookingService.search(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    ) as Promise<PosSearchBookingPagingRes>;
  }

  private prepareChanges(updateDto: any, oldData: any): Record<string, { oldValue: any; newValue: any }> {
    const changes: Record<string, { oldValue: any; newValue: any }> = {};
    Object.keys(updateDto).forEach((key) => {
      if (key !== '_id' && oldData && oldData[key] !== undefined) {
        const oldValue = oldData[key];
        const newValue = updateDto[key];
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          changes[key] = {
            oldValue,
            newValue,
          };
        }
      }
    });
    return changes;
  }
}
