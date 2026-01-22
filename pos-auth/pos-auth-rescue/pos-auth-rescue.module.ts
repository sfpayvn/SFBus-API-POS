// otp.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosAuthRescueController } from './pos-auth-rescue.controller';
import { PosAuthRescueService } from './pos-auth-rescue.service';
import { AuthModule } from '@/module/core/auth/auth/auth.module';
import { AuthRescueModule } from '@/module/core/auth/auth-rescue/auth-rescue.module';

@Module({
  imports: [forwardRef(() => AuthRescueModule)],
  providers: [PosAuthRescueService],
  controllers: [PosAuthRescueController],
  exports: [PosAuthRescueService],
})
export class PosAuthRescueModule {}
