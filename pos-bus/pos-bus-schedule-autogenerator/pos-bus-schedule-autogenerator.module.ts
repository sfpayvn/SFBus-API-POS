import {
  BusScheduleAutogeneratorDocument,
  BusScheduleAutogeneratorSchema,
} from '@/module/core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusScheduleAutogeneratorController } from './pos-bus-schedule-autogenerator.controller';
import { PosBusScheduleAutogeneratorService } from './pos-bus-schedule-autogenerator.service';
import { BusScheduleAutogeneratorModule } from '@/module/core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusScheduleAutogeneratorDocument.name, schema: BusScheduleAutogeneratorSchema },
    ]),
    forwardRef(() => BusScheduleAutogeneratorModule),
  ],
  controllers: [PosBusScheduleAutogeneratorController],
  providers: [PosBusScheduleAutogeneratorService],
  exports: [PosBusScheduleAutogeneratorService],
})
export class PosBusScheduleAutogeneratorModule {}
