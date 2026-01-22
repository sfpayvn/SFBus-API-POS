import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Param,
  Put,
  Query,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBusService } from './pos-bus.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { PosSearchBusQuery } from './dto/pos-bus.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/buses')
export class PosBusController {
  constructor(private readonly PosBusService: PosBusService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosBusService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosBusService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(MarkDefaultTenant())
  @Get('find-by-bus-template/:busTemplateId')
  async findByBusTemplate(
    @Param('busTemplateId', ParseObjectIdPipe) busTemplateId: Types.ObjectId,
    @TenantScope() tenantScope: TenantScopeResult,
  ) {
    const { tenantId, rootTenantId } = tenantScope;
    return this.PosBusService.findByBusTemplate(busTemplateId, tenantId, rootTenantId);
  }
}
