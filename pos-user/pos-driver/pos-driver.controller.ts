// driver.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosDriverService } from './pos-driver.service';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { PosSearchDriversQuery } from './dto/pos-driver.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/drivers')
export class PosDriverController {
  constructor(private PosDriverService: PosDriverService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-one')
  findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.PosDriverService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('/find-one-by-user/:userId')
  findOneByUser(
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.PosDriverService.findOneByUser(userId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-all-user-driver')
  findAllUserDriver(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const tenantId = user.tenantId;
    return this.PosDriverService.findAllUserDriver(tenantId);
  }
}
