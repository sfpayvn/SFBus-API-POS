import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosGoodsService } from './pos-goods-service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { PosUpdateGoodsDto, PosRequestUpdateGoodsScheduleAssignmentDto } from './dto/pos-update-goods.dto';
import { PosCreateGoodsDto } from './dto/pos-create-goods.dto';
import { PosSearchGoodsPagingQuery } from './dto/pos-goods.dto';
import { UpdateAuditFields } from '@/decorators/update-audit-fields.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/goods')
export class PosGoodsController {
  constructor(private readonly posGoodsService: PosGoodsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: true, updateUpdatedBy: true })
  @Post()
  create(
    @Body(ParseObjectIdPipe) PosCreateGoodsDto: PosCreateGoodsDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: createdBy } = user;
    return this.posGoodsService.create(PosCreateGoodsDto, tenantId, createdBy);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Put()
  update(
    @Body(ParseObjectIdPipe) PosUpdateGoodsDto: PosUpdateGoodsDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: updatedBy } = user;
    return this.posGoodsService.update(PosUpdateGoodsDto, tenantId, updatedBy);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Put('updates')
  updates(
    @Body(ParseObjectIdPipe) PosUpdateGoodsDto: PosUpdateGoodsDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: updatedBy } = user;
    return this.posGoodsService.updates(PosUpdateGoodsDto, tenantId, updatedBy);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: deletedBy } = user;
    return this.posGoodsService.remove(id, tenantId, deletedBy);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.posGoodsService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.posGoodsService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all-goods-for-bus-schedule')
  findAllGoodsForBusSchedule(
    @Query('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.posGoodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all-goods-available')
  findAllGoodsAvailable(
    @Query('busRouteId', ParseObjectIdPipe) busRouteId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.posGoodsService.findAllGoodsAvailable(busRouteId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async searchGoodsPaging(
    @Body(ParseObjectIdPipe) query: PosSearchGoodsPagingQuery,
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
    return this.posGoodsService.searchGoodsPaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UpdateAuditFields({ updateCreatedBy: false, updateUpdatedBy: true })
  @Put('updates-goods-schedule-assignments')
  async updatesGoodsScheduleAssignment(
    @Body(ParseObjectIdPipe) posRequestUpdateGoodsScheduleAssignmentDto: PosRequestUpdateGoodsScheduleAssignmentDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id: updatedBy } = user;
    return this.posGoodsService.updatesGoodsScheduleAssignment(
      posRequestUpdateGoodsScheduleAssignmentDto,
      tenantId,
      updatedBy,
    );
  }
}
