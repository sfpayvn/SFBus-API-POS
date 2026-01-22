// otp.service.ts
import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { Injectable, BadRequestException, ForbiddenException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class PosAuthRescueService {
  constructor(
    @InjectModel(AuthRescueDocument.name) private authRescueModel: Model<AuthRescueDocument>,
    @Inject(forwardRef(() => AuthRescueService)) private readonly authRescueService: AuthRescueService,
  ) {}

  async requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId) {
    return this.authRescueService.requestAuthRescue(identifier, purpose, tenantId);
  }

  async verifyAuthRescue(identifier: string, purpose: string, token: string, tenantId: Types.ObjectId) {
    return this.authRescueService.verifyAuthRescue(identifier, purpose, token, tenantId);
  }
}
