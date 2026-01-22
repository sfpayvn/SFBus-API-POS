// driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosDriverService } from './pos-driver.service';
import { PosDriverController } from './pos-driver.controller';
import { PosUserModule } from '../pos-user-main/pos-user.module';
import { DriverModule } from '@/module/core/user/driver/driver.module';
import { DriverDocument, DriverSchema } from '@/module/core/user/driver/schema/driver.schema';

@Module({
  imports: [
    forwardRef(() => DriverModule),
    forwardRef(() => PosUserModule),
    MongooseModule.forFeature([{ name: DriverDocument.name, schema: DriverSchema }]),
  ],
  providers: [PosDriverService],
  controllers: [PosDriverController],
  exports: [PosDriverService],
})
export class PosDriverModule {}
