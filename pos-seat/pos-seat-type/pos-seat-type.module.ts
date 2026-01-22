import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosSeatTypeController } from './pos-seat-type.controller';
import { PosSeatTypeService } from './pos-seat-type.service';
import { SeatTypeDocument, SeatTypeSchema } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeModule } from '@/module/core/seat/seat-type/seat-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SeatTypeDocument.name, schema: SeatTypeSchema }]),
    forwardRef(() => SeatTypeModule),
  ],
  controllers: [PosSeatTypeController],
  providers: [PosSeatTypeService],
  exports: [PosSeatTypeService],
})
export class PosSeatTypeModule {}
