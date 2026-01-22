import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBusController } from './pos-bus.controller';
import { PosBusService } from './pos-bus.service';
import { BusDocument, BusSchema } from '@/module/core/bus/bus/schema/bus.schema';
import { BusModule } from '@/module/core/bus/bus/bus.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: BusDocument.name, schema: BusSchema }]), forwardRef(() => BusModule)],
  controllers: [PosBusController],
  providers: [PosBusService],
  exports: [PosBusService],
})
export class PosBusModule {}
