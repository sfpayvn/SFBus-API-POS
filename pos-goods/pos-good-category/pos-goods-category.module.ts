import {
  GoodsCategoryDocument,
  GoodsCategorySchema,
} from '@/module/core/goods/good-category/schema/goods.-categoryschema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosGoodsCategoryService } from './pos-goods-category-service';
import { PosGoodsCategoryController } from './pos-goods-category.controller';
import { GoodsCategoryModule } from '@/module/core/goods/good-category/goods-category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GoodsCategoryDocument.name, schema: GoodsCategorySchema }]),
    forwardRef(() => GoodsCategoryModule),
  ],
  providers: [PosGoodsCategoryService],
  controllers: [PosGoodsCategoryController],
  exports: [PosGoodsCategoryService],
})
export class PosGoodsCategoryModule {}
