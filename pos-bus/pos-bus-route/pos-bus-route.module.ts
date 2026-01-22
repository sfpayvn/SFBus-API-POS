import { BusRouteDocument, BusRouteSchema } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PosBusRouteController } from './pos-bus-route.controller';
import { PosBusRouteService } from './pos-bus-route.service';
import { BusRouteModule } from '@/module/core/bus/bus-route/bus-route.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BusRouteDocument.name, schema: BusRouteSchema }]),
    forwardRef(() => BusRouteModule),
  ],
  controllers: [PosBusRouteController],
  providers: [PosBusRouteService],
  exports: [PosBusRouteService],
})
export class PosBusRouteModule {}
