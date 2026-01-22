import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosNotificationService } from './pos-notification.service';

@Controller('notifications')
export class PosNotificationController {
  constructor(private readonly PosNotificationService: PosNotificationService) {}
}
