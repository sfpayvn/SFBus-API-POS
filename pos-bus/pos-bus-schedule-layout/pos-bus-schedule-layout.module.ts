import {
  BusScheduleLayoutDocument,
  BusScheduleLayoutSchema,
} from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusScheduleLayoutController } from './pos-bus-schedule-layout.controller';
import { PosBusScheduleLayoutService } from './pos-bus-schedule-layout.service';
import { BusScheduleLayoutModule } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleLayoutDocument.name, schema: BusScheduleLayoutSchema }]),
    forwardRef(() => BusScheduleLayoutModule),
  ],
  controllers: [PosBusScheduleLayoutController],
  providers: [PosBusScheduleLayoutService],
  exports: [PosBusScheduleLayoutService],
})
export class PosBusScheduleLayoutModule {}
