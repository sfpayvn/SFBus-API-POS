// otp.controller.ts
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PosAuthRescueService } from './pos-auth-rescue.service';
import { PosRequestAuthRescueDto, PosVerifyAuthRescueDto } from './dto/pos-auth-rescue.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';

@Controller('pos/auth/rescue')
export class PosAuthRescueController {
  constructor(private readonly PosAuthRescueService: PosAuthRescueService) {}

  @Post('request')
  async request(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) PosRequestAuthRescueDto: PosRequestAuthRescueDto,
  ) {
    const { tenantId } = user;
    const res = await this.PosAuthRescueService.requestAuthRescue(
      PosRequestAuthRescueDto.identifier,
      PosRequestAuthRescueDto.purpose,
      tenantId,
    );
    // PRODUCTION: return { success: true } (kh�ng tr? Token)
    return res;
  }

  @Post('verify')
  @HttpCode(200)
  async verify(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) PosVerifyAuthRescueDto: PosVerifyAuthRescueDto,
  ) {
    const { tenantId } = user;
    return this.PosAuthRescueService.verifyAuthRescue(
      PosVerifyAuthRescueDto.identifier,
      PosVerifyAuthRescueDto.purpose,
      PosVerifyAuthRescueDto.token,
      tenantId,
    );
  }
}
