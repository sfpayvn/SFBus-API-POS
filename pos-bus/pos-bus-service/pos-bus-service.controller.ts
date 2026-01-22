import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBusServiceService } from './pos-bus-service.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { PosSearchBusServicesQuery } from './dto/pos-bus-service.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-service')
export class PosBusServiceController {
  constructor(private readonly PosBusServiceService: PosBusServiceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.PosBusServiceService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.PosBusServiceService.findOne(id, tenantIds);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(MarkDefaultTenant())
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  search(@Body(ParseObjectIdPipe) query: PosSearchBusServicesQuery, @TenantScope() tenantScope: TenantScopeResult) {
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
    return this.PosBusServiceService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
