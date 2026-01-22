import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Date, Types } from 'mongoose';

export class PosBusServiceDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  iconId: Types.ObjectId;

  @Expose()
  icon: string;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusServicesQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusServicesQuery {
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
  sortBy: PosSearchBusServicesQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusServicesQuerySortFilter[];
}

export class PosSearchBusServicesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busServices: PosBusServiceDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
