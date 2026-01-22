import { BusProvinceDocument, BusProvinceSchema } from '@/module/core/bus/bus-province/schema/bus-schema.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusProvinceController } from './pos-bus-province.controller';
import { PosBusProvinceService } from './pos-bus-province.service';
import { BusProvinceModule } from '@/module/core/bus/bus-province/bus-province.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusProvinceDocument.name, schema: BusProvinceSchema }]),
    forwardRef(() => BusProvinceModule),
  ],
  controllers: [PosBusProvinceController],
  providers: [PosBusProvinceService],
  exports: [PosBusProvinceService],
})
export class PosBusProvinceModule {}
