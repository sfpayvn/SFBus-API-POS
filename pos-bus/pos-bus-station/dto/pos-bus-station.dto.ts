import { Type, Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PosBusStationDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly detailAddress: string;

  @Expose()
  readonly location: string;

  @Expose()
  readonly provinceId: Types.ObjectId;

  @Expose()
  readonly imageId?: Types.ObjectId;

  @Expose()
  readonly image?: any;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}

export class PosSearchBusStationsQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusStationsQuery {
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
  sortBy: PosSearchBusStationsQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusStationsQuerySortFilter[];
}

export class PosSearchBusStationsRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busStations: PosBusStationDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
