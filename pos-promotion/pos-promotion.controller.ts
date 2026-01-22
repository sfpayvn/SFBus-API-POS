import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Roles } from '@/decorators/roles.decorator';

import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { PosPromotionService } from './pos-promotion-service';
import { PosRedeemPromotionDto, PosRequestPromotionByRule, PosRequestPromotionMass } from './dto/pos-promotion.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/promotion')
export class PosPromotionController {
  constructor(private readonly PosPromotionService: PosPromotionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('redeem')
  redeem(
    @Body(ParseObjectIdPipe) PosRedeemPromotionDto: PosRedeemPromotionDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosPromotionService.redeem(PosRedeemPromotionDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get()
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.PosPromotionService.findAll(tenantIds);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosPromotionService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('find-all-by-rule')
  findAllByRule(
    @Body(ParseObjectIdPipe) query: PosRequestPromotionByRule,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { userId, bookingIds } = query;
    const { tenantId } = user;
    return this.PosPromotionService.findAllByRule(userId, bookingIds, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('find-mass-promotion')
  findMassPromotion(
    @Body(ParseObjectIdPipe) query: PosRequestPromotionMass,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosPromotionService.findMassPromotion(tenantId);
  }
}
