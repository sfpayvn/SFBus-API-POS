import { PromotionDocument, PromotionSchema } from '@/module/core/promotion/schema/promotion.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosPromotionService } from './pos-promotion-service';
import { PosPromotionController } from './pos-promotion.controller';
import { PromotionModule } from '@/module/core/promotion/promotion.module';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PromotionDocument.name, schema: PromotionSchema }]),
    forwardRef(() => PromotionModule),
    forwardRef(() => TenantSubscriptionUsageModule),
  ],
  providers: [PosPromotionService],
  controllers: [PosPromotionController],
  exports: [PosPromotionService],
})
export class PosPromotionModule {}
