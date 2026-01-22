import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PosSeatDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  index: number;

  @Expose()
  typeId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  status: string;
}

export class PosBusSeatLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seats: PosSeatDto[];
}

export class PosBusLayoutTemplateDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  seatLayouts: PosBusSeatLayoutTemplateDto[];

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusLayoutTemplateQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusLayoutTemplateQuery {
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
  sortBy: PosSearchBusLayoutTemplateQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusLayoutTemplateQuerySortFilter[];
}

export class PosSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busLayoutTemplates: PosBusLayoutTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
