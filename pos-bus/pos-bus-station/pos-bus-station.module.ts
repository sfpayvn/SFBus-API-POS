import { forwardRef, Module } from '@nestjs/common';
import { PosBusStationService } from './pos-bus-station.service';
import { PosBusStationController } from './pos-bus-station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStationDocument, BusStationSchema } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationModule } from '@/module/core/bus/bus-station/bus-station.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusStationDocument.name, schema: BusStationSchema }]),
    forwardRef(() => BusStationModule),
  ],
  controllers: [PosBusStationController],
  providers: [PosBusStationService],
  exports: [PosBusStationService],
})
export class PosBusStationModule {}
