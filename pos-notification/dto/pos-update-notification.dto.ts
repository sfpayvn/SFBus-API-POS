import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { PosCreateNotificationDto } from './pos-create-notificationdto';

export class PosUpdateNotificationDto extends PartialType(PosCreateNotificationDto) {
  _id: Types.ObjectId;
}
