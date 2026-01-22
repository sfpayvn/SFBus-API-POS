import { BusLayoutTemplateModule } from '@/module/core/bus/bus-layout-template/bus-layout-template.module';
import {
  BusScheduleTemplateDocument,
  BusScheduleTemplateSchema,
} from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { BusModule } from '@/module/core/bus/bus/bus.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusScheduleTemplateController } from './pos-bus-schedule-template.controller';
import { PosBusScheduleTemplateService } from './pos-bus-schedule-template.service';
import { BusScheduleTemplateModule } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusScheduleTemplateDocument.name, schema: BusScheduleTemplateSchema }]),
    forwardRef(() => BusScheduleTemplateModule),
  ],
  controllers: [PosBusScheduleTemplateController],
  providers: [PosBusScheduleTemplateService],
  exports: [PosBusScheduleTemplateService],
})
export class PosBusScheduleTemplateModule {}
