import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PosGoodsCategoryService } from './pos-goods-category-service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { PosCreateGoodsCategoryDto } from './dto/pos-create-goods-category.dto';
import { PosSearchGoodsCategoryPagingQuery } from './dto/pos-goods-category.dto';
import { PosUpdateGoodsCategoryDto } from './dto/pos-update-goods-category.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/goods-category')
export class PosGoodsCategoryController {
  constructor(private readonly PosGoodsCategoryService: PosGoodsCategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post()
  create(
    @Body(ParseObjectIdPipe) PosCreateGoodsCategoryDto: PosCreateGoodsCategoryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosGoodsCategoryService.create(PosCreateGoodsCategoryDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) PosUpdateGoodsCategoryDto: PosUpdateGoodsCategoryDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosGoodsCategoryService.update(PosUpdateGoodsCategoryDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosGoodsCategoryService.remove(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-by-ids')
  findByIds(@Query(ParseObjectIdPipe) ids: Types.ObjectId[], @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantId, rootTenantId } = tenantScope;
    return this.PosGoodsCategoryService.findByIds(ids, tenantId, rootTenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosGoodsCategoryService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosGoodsCategoryService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async searchGoodsCategoryPaging(
    @Body(ParseObjectIdPipe) query: PosSearchGoodsCategoryPagingQuery,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
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
    const { tenantId } = user;
    return this.PosGoodsCategoryService.searchGoodsCategoryPaging(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }
}
