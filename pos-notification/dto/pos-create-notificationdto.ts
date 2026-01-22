import { IsString, IsDate } from 'class-validator';
import { PosNotificationDto } from './pos-notification.dto';
import { OmitType } from '@nestjs/mapped-types';

export class PosCreateNotificationDto extends OmitType(PosNotificationDto, [
  '_id',
  'createdAt',
  'updatedAt',
  '__v',
] as const) {}
