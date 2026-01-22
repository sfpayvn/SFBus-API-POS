import { BusServiceDocument, BusServiceSchema } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusServiceController } from './pos-bus-service.controller';
import { PosBusServiceService } from './pos-bus-service.service';
import { BusServiceModule } from '@/module/core/bus/bus-service/bus-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusServiceDocument.name, schema: BusServiceSchema }]),
    forwardRef(() => BusServiceModule),
  ],
  controllers: [PosBusServiceController],
  providers: [PosBusServiceService],
  exports: [PosBusServiceService],
})
export class PosBusServiceModule {}
