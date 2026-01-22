// src/bus-schedule/dto/update-bus-schedule.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { PosCreateBusScheduleAutogeneratorDto } from './pos-create-bus-schedule-autogenerator.dto';

export class PosUpdateBusScheduleAutogeneratorDto extends PartialType(PosCreateBusScheduleAutogeneratorDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsOptional()
  @IsEnum(['un_published', 'scheduled', 'in_progress', 'completed', 'cancelled'])
  status?: 'un_published' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}
