import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PosCreateBookingDto, PosCreateBookingItemDto, PosCreateBookingItemSeatDto } from './pos-create-booking.dto';

export class PosUpdateBookingItemSeatDto extends PartialType(PosCreateBookingItemSeatDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;
}

export class PosUpdateBookingItemDto extends OmitType(PosCreateBookingItemDto, ['seat'] as const) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PosUpdateBookingItemSeatDto)
  seat: PosUpdateBookingItemSeatDto;
}

export class PosUpdateBookingDto extends OmitType(PosCreateBookingDto, ['bookingItems', 'status'] as const) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PosUpdateBookingItemDto)
  bookingItems: PosUpdateBookingItemDto[];
}
