import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosPaymentService } from './pos-payment-service';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { Types } from 'mongoose';
import { PosRequestPaymentDto } from './dto/pos-payment.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/payment')
export class PosPaymentController {
  constructor(private readonly posPaymentService: PosPaymentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('/processBookingPayment')
  processBookingPayment(
    @Body(ParseObjectIdPipe) posRequestPaymentDto: PosRequestPaymentDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.posPaymentService.processBookingPayment(posRequestPaymentDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Post('/processGoodsPayment')
  processGoodsPayment(
    @Body(ParseObjectIdPipe) posRequestPaymentDto: PosRequestPaymentDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    return this.posPaymentService.processGoodsPayment(posRequestPaymentDto, tenantId, _id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @Get('find-by-referrent-id/:referrentId')
  findAllByReferrentId(
    @Param('referrentId', ParseObjectIdPipe) referrentId: Types.ObjectId,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const tenantId = user.tenantId;
    return this.posPaymentService.findAllByReferrentId(referrentId, tenantId);
  }
}
