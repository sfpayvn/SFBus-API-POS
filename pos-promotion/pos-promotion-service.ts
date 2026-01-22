import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PromotionDocument } from '@/module/core/promotion/schema/promotion.schema';
import { PromotionService } from '@/module/core/promotion/promotion-service';
import { PromotionDto } from '@/module/core/promotion/dto/promotion.dto';
import { PosRedeemPromotionDto, PosPromotionDto } from './dto/pos-promotion.dto';

@Injectable()
export class PosPromotionService {
  constructor(
    @InjectModel(PromotionDocument.name) private readonly promotionModel: Model<PromotionDocument>,
    @Inject(forwardRef(() => PromotionService)) private readonly promotionService: PromotionService,
  ) {}

  async redeem(PosRedeemPromotionDto: PosRedeemPromotionDto, tenantId: Types.ObjectId): Promise<boolean> {
    return this.promotionService.redeem(PosRedeemPromotionDto, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosPromotionDto[]> {
    return this.promotionService.findAll(tenantIds);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<PosPromotionDto | null> {
    return this.promotionService.findOne(id, tenantId);
  }

  async findAllByRule(
    userId: Types.ObjectId,
    bookingIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<PromotionDto[]> {
    return this.promotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  async findMassPromotion(tenantId: Types.ObjectId): Promise<PosPromotionDto[]> {
    return this.promotionService.findMassPromotion(tenantId);
  }
}
