// bus-Layout.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBusScheduleLayoutService } from './pos-bus-schedule-layout.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-schedule-layouts')
export class PosBusScheduleLayoutController {
  constructor(private readonly PosBusScheduleLayoutService: PosBusScheduleLayoutService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get()
  async findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosBusScheduleLayoutService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-one/:id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosBusScheduleLayoutService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-one-by-bus-schedule/:busScheduleId')
  async findOneByBusSchedule(
    @Param('busScheduleId', ParseObjectIdPipe) busScheduleId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.PosBusScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
