// src/bus-schedule/bus-schedule.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { PosBusScheduleService } from './pos-bus-schedule.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { PosSearchBusSchedulePagingQuery } from './dto/pos-bus-schedule.dto';
import { Types } from 'mongoose';
import { PosUpdateBusScheduleDto } from './dto/pos-update-bus-schedule.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-schedules')
export class PosBusScheduleController {
  constructor(private readonly posBusScheduleService: PosBusScheduleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Put('update')
  update(
    @Body(ParseObjectIdPipe) posUpdateBusScheduleDto: PosUpdateBusScheduleDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.posBusScheduleService.update(posUpdateBusScheduleDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.posBusScheduleService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all')
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.posBusScheduleService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async searchBusSchedulePaging(
    @Body(ParseObjectIdPipe) query: PosSearchBusSchedulePagingQuery,
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
    return this.posBusScheduleService.searchBusSchedulePaging(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search/departure')
  async searchBusScheduleDeparture(
    @Body(ParseObjectIdPipe) query: PosSearchBusSchedulePagingQuery,
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
    return this.posBusScheduleService.searchBusScheduleDeparture(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search/arrival')
  async searchBusScheduleArrival(
    @Body(ParseObjectIdPipe) query: PosSearchBusSchedulePagingQuery,
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
    return this.posBusScheduleService.searchBusScheduleArrival(+pageIdx, +pageSize, keyword, sortBy, filters, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Put('update-current-station/:busScheduleId')
  updateCurrentStation(
    @Body('currentStationId', ParseObjectIdPipe) currentStationId: Types.ObjectId,
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.posBusScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
  }
}
