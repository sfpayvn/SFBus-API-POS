import { OmitType } from '@nestjs/mapped-types';
import { PosBusScheduleAutogeneratorDto } from './pos-bus-schedule-autogenerator.dto';

export class PosCreateBusScheduleAutogeneratorDto extends OmitType(PosBusScheduleAutogeneratorDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}
