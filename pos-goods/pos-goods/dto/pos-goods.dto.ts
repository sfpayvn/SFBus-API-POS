import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusScheduleDto } from '@/module/core/bus/bus-schedule/dto/bus-schedule.dto';
import { PosGoodsCategoryDto } from '../../pos-good-category/dto/pos-goods-category.dto';

export class PosGoodsDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleId: Types.ObjectId;

  @Expose()
  busSchedule: BusScheduleDto;

  @Expose()
  name: string;

  @Expose()
  goodsNumber: string;

  @Expose()
  customerName: string;

  @Expose()
  customerPhoneNumber: string;

  @Expose()
  customerAddress: string;

  @Expose()
  senderName: string;

  @Expose()
  senderPhoneNumber: string;

  @Expose()
  senderAddress: string;

  @Expose()
  goodsPriority: number;

  @Expose()
  goodsImportant: boolean;

  @Expose()
  quantity: number;

  @Expose()
  shippingCost: number;

  @Expose()
  cod: number;

  @Expose()
  goodsValue: number;

  @Expose()
  categories: PosGoodsCategoryDto[];

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  weight: number;

  @Expose()
  length: number;

  @Expose()
  width: number;

  @Expose()
  busRoute: BusRouteDto;

  @Expose()
  note: string;

  @Expose()
  status: string;

  @Expose()
  paymentStatus: string;

  @Expose()
  paidBy: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosGoodsSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class PosSearchGoodsPagingQuery {
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
  keyword: string;

  @IsOptional()
  sortBy: PosGoodsSortFilter;

  @IsOptional()
  filters: PosGoodsSortFilter[];
}

export class PosSearchGoodsPagingRes {
  pageIdx: number = 0;
  goods: PosGoodsDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
