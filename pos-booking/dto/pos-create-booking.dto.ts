import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class PosCreateBookingItemSeatDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  seatNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

export class PosCreateBookingItemDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  bookingItemNumber: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PosCreateBookingItemSeatDto)
  seat: PosCreateBookingItemSeatDto;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  discountAmount: number;

  @IsNotEmpty()
  @Type(() => Number)
  afterDiscountPrice: number;

  @IsOptional()
  @Type(() => Types.ObjectId)
  departure: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  destination: Types.ObjectId;
}

export class PosCreateBookingUserInforDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @Type(() => String)
  phoneNumber: string;
}

export class PosCreateBookingDto {
  tenantId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  createBy: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PosCreateBookingUserInforDto)
  userInfo: PosCreateBookingUserInforDto;

  @IsNotEmpty()
  @Type(() => String)
  bookingNumber: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PosCreateBookingItemDto)
  bookingItems: PosCreateBookingItemDto[];

  @IsOptional()
  @Type(() => Types.ObjectId)
  promotionId?: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Number)
  totalPrice: number;

  @IsNotEmpty()
  @Type(() => Number)
  discountTotalAmount: number;

  @IsNotEmpty()
  @Type(() => Number)
  afterDiscountTotalPrice: number;

  @IsOptional()
  @Type(() => Date)
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  createdBy: Types.ObjectId;
}
