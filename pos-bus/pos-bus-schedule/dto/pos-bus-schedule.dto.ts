import { Types } from 'mongoose';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { PosBusProvinceDto } from '../../pos-bus-province/dto/pos-bus-province.dto';
import { PosBusTemplateDto } from '../../pos-bus-template/dto/pos-bus-template.dto';
import { PosDriverDto } from '@/module/pos/pos-user/pos-driver/dto/pos-driver.dto';
import { PosBusDto } from '../../pos-bus-main/dto/pos-bus.dto';
import { PosBusRouteDto } from '../../pos-bus-route/dto/pos-bus-route.dto';

export class PosBusScheduleBreakPointsTimeDto {
  @Expose()
  busStationId: Types.ObjectId;

  @Expose()
  province: PosBusProvinceDto;

  @Expose()
  name: string;

  @Expose()
  detailAddress: string;

  @Expose()
  location: string;

  @Expose()
  provinceId: Types.ObjectId;

  @Expose()
  timeSchedule: string;
}

export class PosBusScheduleBusDto extends PosBusDto {}

export class PosBusScheduleRouteDto extends PosBusRouteDto {
  @Expose()
  breakPoints: PosBusScheduleBreakPointsTimeDto[];
}

export class PosBusSeatPrices {
  @Expose()
  seatTypeId: Types.ObjectId;

  @Expose()
  seatTypeName: string;

  @Expose()
  price: number;
}

export class PosBusScheduleDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  busScheduleNumber: string;

  @Expose()
  name: string;

  @Expose()
  busId?: Types.ObjectId;

  @Expose()
  currentStationId: Types.ObjectId;

  @Expose()
  busDriverIds: Types.ObjectId[];

  @Expose()
  busDrivers?: PosDriverDto[];

  @Expose()
  bus?: PosBusScheduleBusDto;

  @Expose()
  busTemplateId: Types.ObjectId;

  @Expose()
  busTemplate: PosBusTemplateDto;

  @Expose()
  busRouteId: Types.ObjectId;

  @Expose()
  busRoute: PosBusScheduleRouteDto;

  @Expose()
  busLayoutTemplateId: Types.ObjectId;

  @Expose()
  busScheduleTemplateId: Types.ObjectId;

  @Expose()
  busSeatPrices: PosBusSeatPrices[];

  @Expose()
  remainSeat: number;

  @Expose()
  status: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';

  @Expose()
  note?: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Exclude()
  busSeatLayoutBlockIds: Types.ObjectId[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchBusScheduleQuery {
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  departureDate: Date;

  @Type(() => String)
  @IsNotEmpty()
  departureId: Types.ObjectId;

  @Type(() => String)
  @IsNotEmpty()
  destinationId: Types.ObjectId;
}

export class PosSearchBusSchedulePagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string | string[];
}

export class PosSearchBusSchedulePagingQuery {
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

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @Type(() => String)
  departureId: Types.ObjectId;

  @Type(() => String)
  destinationId: Types.ObjectId;
}

export class PosSearchBusSchedulePagingRes {
  @Expose()
  pageIdx: number = 0;
  @Expose()
  busSchedules: PosBusScheduleDto[];
  @Expose()
  totalPage: number = 0;
  @Expose()
  totalItem: number = 0;
}

export class PosSearchBusScheduleDriverQuery {
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  driverId: Types.ObjectId;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}
