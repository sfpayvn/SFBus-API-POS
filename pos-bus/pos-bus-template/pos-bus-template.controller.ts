import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBusTemplateService } from './pos-bus-template.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { BusTemplateDto } from '@/module/core/bus/bus-template/dto/bus-template.dto';
import { Types } from 'mongoose';
import { PosSearchBusTemplateQuery } from './dto/pos-bus-template.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-templates')
export class PosBusTemplateController {
  constructor(private readonly PosBusTemplateService: PosBusTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  async findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.PosBusTemplateService.findAll(tenantIds);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  search(@Body(ParseObjectIdPipe) query: PosSearchBusTemplateQuery, @TenantScope() tenantScope: TenantScopeResult) {
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
    return this.PosBusTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
