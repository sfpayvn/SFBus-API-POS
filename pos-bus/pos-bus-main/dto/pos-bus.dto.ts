// src/bus/interfaces/bus.interface.ts
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { PosBusTemplateDto } from '../../pos-bus-template/dto/pos-bus-template.dto';

export class PosBusDto {
  @Expose()
  _id: string;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: PosBusTemplateDto;

  @Expose()
  licensePlate: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchBusQuery {
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
  sortBy: PosSearchBusQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: PosSearchBusQuerySortFilter[];
}

export class PosSearchBusRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  buses: PosBusDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}
