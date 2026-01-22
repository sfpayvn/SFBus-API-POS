// auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PosAuthService } from './pos-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './pos-auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from '@/jwt/local.strategy';
import { JwtStrategy } from '@/jwt/jwt.strategy';
import { PosUserModule } from '../../pos-user/pos-user-main/pos-user.module';
import { PosTenantModule } from '../../pos-tenant/pos-tenant.module';
import { UserModule } from '../../../core/user/user/user.module';
import { AuthModule } from '@/module/core/auth/auth/auth.module';
import { PosAuthRescueModule } from '../pos-auth-rescue/pos-auth-rescue.module';
import { AutoJobTrackingModule } from '@/module/core/auto-job-tracking/auto-job-tracking.module';
import { PosBusScheduleAutogeneratorModule } from '../../pos-bus/pos-bus-schedule-autogenerator/pos-bus-schedule-autogenerator.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => AutoJobTrackingModule),
    forwardRef(() => PosUserModule),
    forwardRef(() => PosTenantModule),
    forwardRef(() => PassportModule),
    forwardRef(() => PosAuthRescueModule),
    forwardRef(() => PosBusScheduleAutogeneratorModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  providers: [PosAuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class PosAuthModule {}
