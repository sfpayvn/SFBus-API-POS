import { DeliveryType, FulfillmentMode, GoodsEventType } from '@/module/core/goods/types/goods.types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

export class PosCreateGoodsEvent {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  type: GoodsEventType;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  stationId?: Types.ObjectId; // station liên quan (drop/nhận/...)

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  scheduleId?: Types.ObjectId; // schedule liên quan

  @IsNotEmpty()
  @Type(() => String)
  note?: string = '';

  @IsNotEmpty()
  @Type(() => Date)
  createdAt?: Date;
}

export class PosCreateGoodsDto {
  status: string;
  paymentStatus: string;
  goodsNumber: string;

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

  @IsOptional()
  @Type(() => Types.ObjectId)
  originStationId?: Types.ObjectId; // station gửi (office gửi)

  @IsOptional()
  @Type(() => Types.ObjectId)
  destinationStationId?: Types.ObjectId; // station nhận (office nhận / hub cuối)

  @IsOptional()
  @Type(() => Types.ObjectId)
  currentStationId?: Types.ObjectId; // station hiện tại đang giữ hàng (null khi ON_BOARD)

  @IsOptional()
  @Type(() => Types.ObjectId)
  currentScheduleId?: Types.ObjectId; // schedule hiện tại (alias cho busScheduleId)

  // Delivery type & address
  @IsNotEmpty()
  @Type(() => String)
  deliveryType?: DeliveryType; // STATION | ADDRESS

  @IsNotEmpty()
  @Type(() => String)
  pickupFulfillmentMode?: FulfillmentMode; // ROADSIDE | STATION

  @IsNotEmpty()
  @Type(() => String)
  deliveryFulfillmentMode?: FulfillmentMode; // ROADSIDE | STATION

  @IsOptional()
  @Type(() => String)
  pickupAddress?: string; // nếu nhận dọc đường

  @IsOptional()
  @Type(() => String)
  deliveryAddress?: string; // nếu giao tận nhà

  // NEW: history log
  events: PosCreateGoodsEvent[] = [];
}
