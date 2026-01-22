import { Controller, Request, Post, UseGuards, Get, Query, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from '@/guards/local-auth.guard.ts';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { PosForgotPasswordDto, PosResetPasswordDto, PosSignUpDto } from './dto/pos-auth.dto';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosAuthService } from './pos-auth.service';
import { PosVerifyAuthRescueDto } from '../pos-auth-rescue/dto/pos-auth-rescue.dto';
import { RolesGuard } from '@/guards/roles.guard';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { PosUpdatePasswordUserDto } from '../../pos-user/pos-user-main/dto/pos-update-user.dto';
import { TimezoneOffset } from '@/decorators/timezone.decorator';

@Controller('pos/auth')
export class AuthController {
  constructor(private posAuthService: PosAuthService) {}

  // Endpoint đăng nhập
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @TimezoneOffset() timezoneOffset: number) {
    // Sau khi LocalStrategy xác thực, req.user sẽ chứa thông tin người dùng
    // Run auto schedule jobs in background without blocking login
    this.posAuthService.tryAutoScheduleJobs(req.user, timezoneOffset).catch(() => {
      // Silent fail - already handled in service
    });
    return this.posAuthService.login(req.user);
  }

  @Get('verify-phoneNumber')
  async verifyPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const name = await this.posAuthService.verifyPhoneNumber(phoneNumber);
    return JSON.stringify(name);
  }

  // Endpoint kiểm tra token
  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Request() req) {
    // Nếu token hợp lệ, trả về thông tin người dùng
    return { valid: true, user: req.user };
  }

  @Post('verify-forgot-password-otp')
  @HttpCode(200)
  async verifyForgotPasswordOtp(@Body(ParseObjectIdPipe) posVerifyAuthRescueDto: PosVerifyAuthRescueDto) {
    return this.posAuthService.verifyForgotPasswordOtp(
      posVerifyAuthRescueDto.identifier,
      posVerifyAuthRescueDto.tenantCode,
      posVerifyAuthRescueDto.purpose,
      posVerifyAuthRescueDto.token,
    );
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body(ParseObjectIdPipe) posForgotPasswordDto: PosForgotPasswordDto) {
    return this.posAuthService.forgotPassword(
      posForgotPasswordDto.phoneNumber,
      posForgotPasswordDto.tenantCode,
      posForgotPasswordDto.redirectBaseUrl,
    );
  }

  @Post('reset-password')
  async reset(@Body(ParseObjectIdPipe) PosResetPasswordDto: PosResetPasswordDto) {
    return this.posAuthService.resetPassword(PosResetPasswordDto.token, PosResetPasswordDto.newPassword);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-password')
  async updatePassword(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body() posUpdatePasswordUserDto: PosUpdatePasswordUserDto,
  ) {
    const { tenantId, _id } = user;
    const updatedUser = await this.posAuthService.updatePassword(_id, posUpdatePasswordUserDto, tenantId);
    return {
      message: 'Cập nhật thông tin thành công!',
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  }

  // Endpoint lấy thông tin ngư�i dùng hiện tại
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Get('get-current-user')
  async getCurrentUser(@CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId, _id: userId } = user;
    return this.posAuthService.getCurrentUser(userId, tenantId);
  }
}
