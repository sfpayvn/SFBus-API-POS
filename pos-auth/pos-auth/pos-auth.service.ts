// auth.service.ts

import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PosUserService } from '../../pos-user/pos-user-main/pos-user.service';
import { PosUserDto } from '../../pos-user/pos-user-main/dto/pos-user.dto';
import { AuthService } from '@/module/core/auth/auth/auth.service';
import { Types } from 'mongoose';
import { PosAuthRescueService } from '../pos-auth-rescue/pos-auth-rescue.service';
import { plainToInstance } from 'class-transformer';
import { PosUpdatePasswordUserDto } from '../../pos-user/pos-user-main/dto/pos-update-user.dto';
import { PosTenantService } from '../../pos-tenant/pos-tenant.service';
import { AutoJobTrackingService } from '@/module/core/auto-job-tracking';
import { PosBusScheduleAutogeneratorService } from '../../pos-bus/pos-bus-schedule-autogenerator/pos-bus-schedule-autogenerator.service';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class PosAuthService {
  constructor(
    @Inject(forwardRef(() => PosUserService)) private readonly posUserService: PosUserService,
    @Inject(forwardRef(() => PosTenantService)) private readonly posTenantService: PosTenantService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => AutoJobTrackingService)) private readonly autoJobTrackingService: AutoJobTrackingService,
    @Inject(forwardRef(() => PosBusScheduleAutogeneratorService))
    private readonly posBusScheduleAutogeneratorService: PosBusScheduleAutogeneratorService,
    private readonly posAuthRescueService: PosAuthRescueService,
    private jwtService: JwtService,
  ) {}

  async tryAutoScheduleJobs(posUser: PosUserDto, timezoneOffset: number) {
    const isRun = await this.autoJobTrackingService.tryRunToday(posUser.tenantId, 'auto_schedule', timezoneOffset);
    if (isRun) {
      this.posBusScheduleAutogeneratorService
        .generateSchedulesForToday(posUser.tenantId, timezoneOffset)
        .catch((err) => {
          // Silent fail - don't disrupt login
        });
    }
  }

  // Đăng nhập và trả về JWT token
  async login(posUser: PosUserDto) {
    const allowedRoles = [
      ROLE_CONSTANTS.POS,
      ROLE_CONSTANTS.ADMIN,
      ROLE_CONSTANTS.TENANT,
      ROLE_CONSTANTS.TENANT_OPERATOR,
    ];
    if (!posUser.roles.some((role) => allowedRoles.includes(role))) {
      throw new UnauthorizedException('Tài khoản của bạn không đủ quyền để đăng nhập vào ứng dụng này.');
    }

    const payload = {
      _id: posUser._id.toString(),
      roles: posUser.roles,
      tenantId: posUser.tenantId?.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Xác thực người dùng khi đăng nhập
  async verifyPhoneNumber(phoneNumber: string): Promise<any> {
    const user = await this.posUserService.findByPhoneNumber(phoneNumber);
    if (user) {
      return user.name;
    }
    return null;
  }

  async verifyForgotPasswordOtp(identifier: string, tenantCode: string, purpose: string, token: string) {
    const tenant = await this.posTenantService.findByCode(tenantCode);

    if (!tenant) {
      throw new UnauthorizedException('Tenant not found');
    }

    const result = await this.posAuthRescueService.verifyAuthRescue(identifier, purpose, token, tenant._id);
    if (result) {
      const tokenForgotPassword = await this.authService.createForgotPasswordToken(identifier, tenantCode);
      return { token: tokenForgotPassword };
    }

    return null;
  }

  async forgotPassword(phoneNumber: string, tenantCode: string, redirectBaseUrl?: string) {
    const tenant = await this.posTenantService.findByCode(phoneNumber);

    if (!tenant || !tenant.code) {
      throw new UnauthorizedException('Số điện thoại không tồn tại.');
    }

    return this.authService.forgotPassword(phoneNumber, tenant.code, redirectBaseUrl);
  }

  resetPassword(token: string, newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }

  async updatePassword(
    userId: Types.ObjectId,
    posUpdatePasswordUserDto: PosUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ) {
    return this.posUserService.updatePassword(userId, posUpdatePasswordUserDto, tenantId);
  }

  async getCurrentUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosUserDto> {
    const foundUser = await this.posUserService.findById(userId, tenantId);
    if (!foundUser) {
      throw new BadRequestException('User not found.');
    }
    return plainToInstance(PosUserDto, foundUser);
  }
}
