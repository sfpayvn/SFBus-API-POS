import { GoodsDocument, GoodsSchema } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosGoodsService } from './pos-goods-service';
import { PosGoodsController } from './pos-goods.controller';
import { GoodsModule } from '@/module/core/goods/goods/goods.module';
import { PosTrackingModule } from '../../pos-tracking/pos-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsDocument.name, schema: GoodsSchema }]),
    forwardRef(() => GoodsModule),
    forwardRef(() => PosTrackingModule),
  ],
  providers: [PosGoodsService],
  controllers: [PosGoodsController],
  exports: [PosGoodsService],
})
export class PosGoodsModule {}
