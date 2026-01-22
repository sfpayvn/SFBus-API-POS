// notification.service.ts
import { NotificationDocument } from '@/module/core/notification/schema/notificationschema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PosNotificationGateway } from './pos-notification.gateway';

@Injectable()
export class PosNotificationService {
  constructor(
    @InjectModel(NotificationDocument.name) private notificationModel: Model<NotificationDocument>,
    private readonly PosNotificationGateway: PosNotificationGateway,
  ) {}
}
