// src/BusTemplate/interfaces/BusTemplate.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { PosBusServiceDto } from '../../pos-bus-service/dto/pos-bus-service.dto';
import { PosBusTypeDto } from '../../pos-bus-type/dto/pos-bus-type.dto';

export class PosBusTemplateDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  busServiceIds: Types.ObjectId[];

  @Expose()
  busServices: PosBusServiceDto[];

  @Expose()
  busTypeId: Types.ObjectId;

  @Expose()
  busType: PosBusTypeDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusTemplateQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchBusTemplateQuery {
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
  sortBy: PosSearchBusTemplateQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusTemplateQuerySortFilter[];
}

export class PosSearchBusTemplateRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busTemplates: PosBusTemplateDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
