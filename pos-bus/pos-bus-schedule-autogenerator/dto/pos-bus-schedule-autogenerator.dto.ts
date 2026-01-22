import { Types } from 'mongoose';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class PosSpecificTimeSlotDto {
  _id: Types.ObjectId;
  timeSlot: string;
}

export class PosBusScheduleAutogeneratorDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  repeatType: string;

  @Expose()
  repeatInterval: number;

  @Expose()
  specificTimeSlots: PosSpecificTimeSlotDto[];

  @Expose()
  repeatDaysPerWeek: string[];

  @Expose()
  preGenerateDays: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class SearchBusScheduleAutogeneratorQuery {
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
  sortBy: string;

  @IsOptional()
  @IsString()
  filter: string;
}

export class PosSearchBusScheduleRes {
  @Expose()
  pageIdx: number = 0;

  @Expose()
  busScheduleAutoGenerators: PosBusScheduleAutogeneratorDto[];

  @Expose()
  totalPage: number = 0;

  @Expose()
  totalItem: number = 0;
}

export class PosSearchBusSchedulePagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchBusScheduleAutogeneratorQuery {
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
  sortBy: PosSearchBusSchedulePagingQuerySortFilter;

  @IsOptional()
  filters: PosSearchBusSchedulePagingQuerySortFilter[];
}
