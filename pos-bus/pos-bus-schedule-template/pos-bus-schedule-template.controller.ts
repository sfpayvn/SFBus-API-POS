// src/bus-schedule/bus-schedule.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PosBusScheduleTemplateService } from './pos-bus-schedule-template.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { PosSearchBusScheduleTemplateQuery } from './dto/pos-bus-schedule-template.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-schedule_templates')
export class PosBusScheduleTemplateController {
  constructor(private readonly posBusScheduleTemplateService: PosBusScheduleTemplateService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-all')
  findAll(@TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.posBusScheduleTemplateService.findAll(tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    return this.posBusScheduleTemplateService.findOne(id, tenantIds);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Post('search')
  async search(
    @Body(ParseObjectIdPipe) query: PosSearchBusScheduleTemplateQuery,
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
    return this.posBusScheduleTemplateService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds);
  }
}
