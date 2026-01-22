// user.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { PosUserController } from './pos-user.controller';
import { PosUserService } from './pos-user.service';
import { UserModule } from '@/module/core/user/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [PosUserService],
  controllers: [PosUserController],
  exports: [PosUserService],
})
export class PosUserModule {}
