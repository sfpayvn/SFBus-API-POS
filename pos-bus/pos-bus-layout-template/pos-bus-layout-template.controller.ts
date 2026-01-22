// bus-template.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { PosSearchBusLayoutTemplateQuery } from './dto/pos-bus-layout-template.dto';
import { PosBusLayoutTemplateService } from './pos-bus-layout-template.service';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-layout-templates')
export class PosBusLayoutTemplateController {
  constructor(private readonly PosBusLayoutTemplateService: PosBusLayoutTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get('/find-all')
  async findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.PosBusLayoutTemplateService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-one/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.PosBusLayoutTemplateService.findOne(id, tenantIds);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  search(
    @Body(ParseObjectIdPipe) query: PosSearchBusLayoutTemplateQuery,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { tenantIds } = tenantScope;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = {
        key: 'createdAt',
        value: 'desc',
      },
      filters = [],
    } = query;
    return this.PosBusLayoutTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
