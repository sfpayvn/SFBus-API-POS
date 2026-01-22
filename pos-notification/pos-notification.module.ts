// notification.module.ts
import { NotificationDocument, NotificationSchema } from '@/module/core/notification/schema/notificationschema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosNotificationController } from './pos-notification.controller';
import { PosNotificationGateway } from './pos-notification.gateway';
import { PosNotificationService } from './pos-notification.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationDocument.name, schema: NotificationSchema }])],
  controllers: [PosNotificationController],
  providers: [PosNotificationService, PosNotificationGateway],
  exports: [PosNotificationService], // Export PosNotificationService để các module khác có thể sử dụng
})
export class PosNotificationModule {}
