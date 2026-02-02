import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PosBusScheduleDto } from '../../pos-bus/pos-bus-schedule/dto/pos-bus-schedule.dto';
import { PosPaymentDto } from '../../pos-payment/dto/pos-payment.dto';
import { PosPromotionDto } from '../../pos-promotion/dto/pos-promotion.dto';

export class PosUserInforBookingDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
}

export class PosBookingItemSeatDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  seatNumber: string;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  status: string;
}

export class PosBookingItemDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  bookingItemNumber: string;

  @Expose()
  @Type(() => PosBookingItemSeatDto)
  seat: PosBookingItemSeatDto;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  discountAmount: number;

  @Expose()
  @Type(() => Number)
  afterDiscountPrice: number;

  @Expose()
  @Type(() => String)
  departure: string;

  @Expose()
  @Type(() => String)
  destination: string;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class PosBookingDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  @Type(() => String)
  tenantId: string;

  @Expose()
  @Type(() => String)
  userId: string;

  @Expose()
  @Type(() => Number)
  quantity: number;

  @Expose()
  @Type(() => PosUserInforBookingDto)
  userInfo: PosUserInforBookingDto;

  @Expose()
  @Type(() => String)
  bookingNumber: string;

  @Expose()
  @Type(() => String)
  busScheduleId: string;

  @Expose()
  @Type(() => String)
  busRouteId: string;

  @Expose()
  @Type(() => PosBusScheduleDto)
  busSchedule: PosBusScheduleDto;

  @Expose()
  @Type(() => PosBookingItemDto)
  bookingItems: PosBookingItemDto[];

  @Expose()
  @Type(() => PosPromotionDto)
  promotion: PosPromotionDto;

  @Expose()
  @Type(() => PosPaymentDto)
  payments: PosPaymentDto[];

  @Expose()
  @Type(() => Number)
  totalPrice: number;

  @Expose()
  @Type(() => Number)
  discountTotalAmount: number;

  @Expose()
  @Type(() => Number)
  afterDiscountTotalPrice: number;

  @Expose()
  @Type(() => Date)
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @Expose()
  @Type(() => String)
  bookingGroupNumber: string;

  @Expose()
  @Type(() => String)
  status: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Exclude()
  createdBy: Types.ObjectId;

  @Exclude()
  updatedBy: Types.ObjectId;
}

export class PosBookingSortFilter {
  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class PosSearchBookingPagingQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  @Type(() => String)
  keyword: string;

  @IsOptional()
  @Type(() => PosBookingSortFilter)
  sortBy: PosBookingSortFilter;

  @IsOptional()
  @Type(() => PosBookingSortFilter)
  filters: PosBookingSortFilter[];
}

export class PosSearchBookingPagingRes {
  @Expose()
  @Type(() => Number)
  pageIdx: number = 0;

  @Expose()
  @Type(() => PosBookingDto)
  bookings: PosBookingDto[];

  @Expose()
  @Type(() => Number)
  totalPage: number = 0;

  @Expose()
  @Type(() => Number)
  totalItem: number = 0;
}

export class PosRequestUpdatePaymentMethodByIdsDto {
  @IsArray()
  @Type(() => Types.ObjectId)
  bookingIds: Types.ObjectId[];

  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;
}

export class PosCancelBookingDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;

  @IsArray()
  @Type(() => Types.ObjectId)
  bookingIds: Types.ObjectId[];
}
