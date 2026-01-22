import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { PosTrackingService } from './pos-tracking.service';
import { CreateTrackingDto } from '@/module/core/tracking/dto/create-tracking.dto';
import { UpdateTrackingDto } from '@/module/core/tracking/dto/update-tracking.dto';
import { SearchTrackingQuerySortFilter } from '@/module/core/tracking/dto/tracking.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/tracking')
export class PosTrackingController {
  constructor(private readonly trackingService: PosTrackingService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post()
  create(
    @Body(ParseObjectIdPipe) createTrackingDto: CreateTrackingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.trackingService.create(createTrackingDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get()
  findAll(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.findAll(tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('type/:type')
  findByType(@Param('type') type: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.findByType(type, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.findOne(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Put()
  update(
    @Body(ParseObjectIdPipe) updateTrackingDto: UpdateTrackingDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.trackingService.update(updateTrackingDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.trackingService.remove(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('search')
  search(
    @Body()
    body: {
      pageIdx: number;
      pageSize: number;
      keyword: string;
      sortBy: SearchTrackingQuerySortFilter;
      filters: SearchTrackingQuerySortFilter[];
    },
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    const { pageIdx, pageSize, keyword, sortBy, filters } = body;
    return this.trackingService.searchTracking(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
