import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PosBusProvinceDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  isDefault?: boolean;

  @Expose()
  isActive?: boolean;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}

export class PosSearchBusProvincesQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusProvincesQuery {
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
  sortBy: PosSearchBusProvincesQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusProvincesQuerySortFilter[];
}

export class PosSearchBusProvincesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busProvinces: PosBusProvinceDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
