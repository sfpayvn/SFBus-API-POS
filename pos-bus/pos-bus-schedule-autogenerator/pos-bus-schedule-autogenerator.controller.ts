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
} from '@nestjs/common';
import { PosBusScheduleAutogeneratorService } from './pos-bus-schedule-autogenerator.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { PosCreateBusScheduleAutogeneratorDto } from './dto/pos-create-bus-schedule-autogenerator.dto';
import { PosUpdateBusScheduleAutogeneratorDto } from './dto/pos-update-bus-schedule-autogenerator.dto';
import { Types } from 'mongoose';
import { PosSearchBusScheduleAutogeneratorQuery } from './dto/pos-bus-schedule-autogenerator.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { TimezoneOffset } from '@/decorators/timezone.decorator';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/bus-schedule-autogenerators')
export class PosBusScheduleAutogeneratorController {
  constructor(private readonly PosBusScheduleAutogeneratorService: PosBusScheduleAutogeneratorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post()
  create(
    @Body(ParseObjectIdPipe) PosCreateBusScheduleAutogeneratorDto: PosCreateBusScheduleAutogeneratorDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.PosBusScheduleAutogeneratorService.create(
      PosCreateBusScheduleAutogeneratorDto,
      tenantId,
      timezoneOffset,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) PosUpdateBusScheduleAutogeneratorDto: PosUpdateBusScheduleAutogeneratorDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @TimezoneOffset() timezoneOffset: number,
  ) {
    const { tenantId } = user;
    return this.PosBusScheduleAutogeneratorService.update(
      PosUpdateBusScheduleAutogeneratorDto,
      tenantId,
      timezoneOffset,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosBusScheduleAutogeneratorService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.PosBusScheduleAutogeneratorService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search')
  async searchBusScheduleAutogenerator(
    @Body(ParseObjectIdPipe) query: PosSearchBusScheduleAutogeneratorQuery,
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
    return this.PosBusScheduleAutogeneratorService.searchBusScheduleAutogenerator(
      +pageIdx,
      +pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }
}
