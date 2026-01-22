import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

export class PosBusRouteDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  breakPoints: PosBusRouteBreakPointsDto[];

  @Expose()
  distance: number;

  @Expose()
  distanceTime: string;

  @Expose()
  notes?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosBusRouteBreakPointsDto {
  busStationId: Types.ObjectId;
}

export class PosSearchBusRouteQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusRouteQuery {
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
  sortBy: PosSearchBusRouteQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusRouteQuerySortFilter[];
}

export class PosSearchBusRouteRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busRoutes: PosBusRouteDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
