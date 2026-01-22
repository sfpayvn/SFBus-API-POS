import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PosBusTypeDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusTypesQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusTypesQuery {
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
  sortBy: PosSearchBusTypesQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusTypesQuerySortFilter[];
}

export class PosSearchBusTypesRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTypes: PosBusTypeDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
