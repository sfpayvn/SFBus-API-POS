import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Put,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBookingService } from './pos-booking-service';
import { Roles } from '@/decorators/roles.decorator';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { PosCreateBookingDto } from './dto/pos-create-booking.dto';
import { PosUpdateBookingDto } from './dto/pos-update-booking.dto';
import { PosCancelBookingDto, PosSearchBookingPagingQuery } from './dto/pos-booking.dto';
import { UpdateAuditFields } from '@/decorators/update-audit-fields.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/booking')
export class PosBookingController {
  constructor(private readonly posBookingService: PosBookingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: true, updateUpdatedBy: true })
  @Post()
  create(
    @Headers('idempotency-key') idempotencyKey: string,
    @Body(ParseObjectIdPipe) posCreateBookingDto: PosCreateBookingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key is required');
    }
    const { _id, tenantId } = user;
    // Set source for all bookings
    const bookingsWithSource = posCreateBookingDto.map((booking) => ({
      ...booking,
      source: ROLE_CONSTANTS.POS,
    }));
    return this.posBookingService.create(bookingsWithSource, tenantId, _id, idempotencyKey);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Post('cancel')
  cancelBookings(
    @Body(ParseObjectIdPipe) body: PosCancelBookingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const { busScheduleId, bookingIds } = body;
    return this.posBookingService.cancelBookings(busScheduleId, bookingIds, tenantId, user._id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Put()
  update(
    @Body(ParseObjectIdPipe) posUpdateBookingDto: PosUpdateBookingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.posBookingService.update(posUpdateBookingDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Put('updates')
  updates(
    @Body(ParseObjectIdPipe) posUpdateBookingsDto: PosUpdateBookingDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.posBookingService.updates(posUpdateBookingsDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.posBookingService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all-by-schedule-id/:busScheduleId')
  findAllByScheduleId(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.posBookingService.findAllByScheduleId(busScheduleId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: PosSearchBookingPagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = { key: 'createdAt', value: 'desc' as const },
      filters = [],
    } = query;

    return this.posBookingService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }
}
