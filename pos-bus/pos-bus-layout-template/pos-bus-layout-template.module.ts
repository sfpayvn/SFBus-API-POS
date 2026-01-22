import {
  BusLayoutTemplateDocument,
  BusLayoutTemplateSchema,
} from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusLayoutTemplateController } from './pos-bus-layout-template.controller';
import { PosBusLayoutTemplateService } from './pos-bus-layout-template.service';
import { BusLayoutTemplateModule } from '@/module/core/bus/bus-layout-template/bus-layout-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusLayoutTemplateDocument.name, schema: BusLayoutTemplateSchema }]),
    forwardRef(() => BusLayoutTemplateModule),
  ],
  controllers: [PosBusLayoutTemplateController],
  providers: [PosBusLayoutTemplateService],
  exports: [PosBusLayoutTemplateService],
})
export class PosBusLayoutTemplateModule {}
