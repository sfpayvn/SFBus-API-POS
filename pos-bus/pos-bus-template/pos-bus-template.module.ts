import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';
import { BusTemplateDocument, BusTemplateSchema } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusTemplateController } from './pos-bus-template.controller';
import { PosBusTemplateService } from './pos-bus-template.service';
import { PosBusTypeModule } from '../pos-bus-type/pos-bus-type.module';
import { PosBusServiceModule } from '../pos-bus-service/pos-bus-service.module';
import { BusTemplateModule } from '@/module/core/bus/bus-template/bus-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTemplateDocument.name, schema: BusTemplateSchema }]),
    forwardRef(() => PosBusServiceModule),
    forwardRef(() => PosBusTypeModule),
    forwardRef(() => BusTemplateModule),
  ],
  controllers: [PosBusTemplateController],
  providers: [PosBusTemplateService],
  exports: [PosBusTemplateService],
})
export class PosBusTemplateModule {}
