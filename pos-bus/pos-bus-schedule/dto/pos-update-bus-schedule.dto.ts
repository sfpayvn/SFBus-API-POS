// src/bus-schedule/dto/update-bus-schedule.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsNotEmpty, IsMongoId, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBusScheduleTemplateBusSeatPrices } from '@/module/core/bus/bus-schedule-template/dto/create-bus-schedule-template.dto';
import {
  CreateBusScheduleBusDto,
  CreateBusScheduleBusTemplateDto,
  CreateBusRouteScheduleDto,
} from '@/module/core/bus/bus-schedule/dto/create-bus-schedule.dto';

export class PosUpdateBusScheduleDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  tenantId: Types.ObjectId;
  busScheduleNumber: string;

  @IsOptional()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busId?: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  currentStationId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busDriverIds: Types.ObjectId[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBusScheduleBusDto)
  bus?: CreateBusScheduleBusDto;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busTemplateId: Types.ObjectId;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBusScheduleBusTemplateDto)
  busTemplate: CreateBusScheduleBusTemplateDto;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busRouteId: Types.ObjectId;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBusRouteScheduleDto)
  busRoute: CreateBusRouteScheduleDto;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busLayoutTemplateId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busScheduleTemplateId: Types.ObjectId;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBusScheduleTemplateBusSeatPrices)
  busSeatPrices: CreateBusScheduleTemplateBusSeatPrices[];

  @IsOptional()
  @IsEnum(['un_published', 'scheduled', 'overdue', 'in_progress', 'completed', 'cancelled'])
  status?: 'un_published' | 'scheduled' | 'overdue' | 'in_progress' | 'completed' | 'cancelled';

  @IsOptional()
  @Type(() => String)
  note?: string;

  @IsOptional()
  @Type(() => String)
  startDate: string;

  @IsOptional()
  @Type(() => String)
  endDate: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  busSeatLayoutBlockIds: Types.ObjectId[];
}
