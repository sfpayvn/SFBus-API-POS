import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class PosCreateGoodsDto {
  status: string;
  goodsNumber: string;
  paymentStatus: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  customerName: string;

  @IsNotEmpty()
  @Type(() => String)
  customerPhoneNumber: string;

  @IsOptional()
  @Type(() => String)
  customerAddress: string;

  @IsNotEmpty()
  @Type(() => String)
  senderName: string;

  @IsNotEmpty()
  @Type(() => String)
  senderPhoneNumber: string;

  @IsOptional()
  @Type(() => String)
  senderAddress: string;

  @IsNotEmpty()
  @Type(() => Number)
  goodsPriority: number;

  @IsNotEmpty()
  @Type(() => Boolean)
  goodsImportant: boolean;

  @IsOptional()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @Type(() => Number)
  shippingCost: number;

  @IsOptional()
  @Type(() => Number)
  cod: number;

  @IsOptional()
  @Type(() => Number)
  goodsValue: number;

  @IsOptional()
  @Type(() => Number)
  weight: number;

  @IsOptional()
  @Type(() => Number)
  length: number;

  @IsOptional()
  @Type(() => Number)
  width: number;

  @IsOptional()
  @Type(() => Number)
  height: number;

  @IsOptional()
  @Type(() => String)
  note: string;

  @IsNotEmpty()
  @Type(() => String)
  paidBy: string;

  @IsOptional()
  @Type(() => String)
  imageIds: Types.ObjectId[];
}
