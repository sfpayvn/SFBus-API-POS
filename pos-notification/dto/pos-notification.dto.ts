import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class PosNotificationDto {
  @Exclude()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Exclude()
  title: string;

  @Exclude()
  desc: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}
