import { BusScheduleDocument, BusScheduleSchema } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusScheduleController } from './pos-bus-schedule.controller';
import { PosBusScheduleService } from './pos-bus-schedule.service';
import { BusScheduleModule } from '@/module/core/bus/bus-schedule/bus-schedule.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleDocument.name, schema: BusScheduleSchema }]),
    forwardRef(() => BusScheduleModule),
  ],
  controllers: [PosBusScheduleController],
  providers: [PosBusScheduleService],
  exports: [PosBusScheduleService],
})
export class PosBusScheduleModule {}
