import { MongooseModule } from '@nestjs/mongoose';
import { PosBusTypeController } from './pos-bus-type.controller';
import { PosBusTypeService } from './pos-bus-type.service';
import { BusTypeDocument, BusTypeSchema } from '@/module/core/bus/bus-type/schema/bus-type.schema';
import { forwardRef, Module } from '@nestjs/common';
import { BusTypeModule } from '@/module/core/bus/bus-type/bus-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusTypeDocument.name, schema: BusTypeSchema }]),
    forwardRef(() => BusTypeModule),
  ],
  controllers: [PosBusTypeController],
  providers: [PosBusTypeService],
  exports: [PosBusTypeService],
})
export class PosBusTypeModule {}
