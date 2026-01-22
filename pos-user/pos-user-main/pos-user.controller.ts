import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Type,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosUserService } from './pos-user.service';
import { PosCreateUserDto } from './dto/pos-create-user.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { SearchUsersTypesQuery, UserDto } from '@/module/core/user/user/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { StripFields } from '@/interceptors/strip-fields.interceptor';
import { PosRequestUpdateUserFieldDto, PosSearchUsersTypesQuery } from './dto/pos-user.dto';
import { Feature } from '@/decorators/feature.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { UpdatePasswordUserDto } from '@/module/core/user/user/dto/update-user.dto';
import { PosUpdateUserDto, PosUpdateUserProfileDto } from './dto/pos-update-user.dto';
import { Types } from 'mongoose';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Controller('pos/users')
export class PosUserController {
  constructor(private posUserService: PosUserService) {}

  // Endpoint cập nhật thông tin ngư�i dùng
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.POS, ROLE_CONSTANTS.ADMIN)
  @UseInterceptors(StripFields(['password']))
  @Put('profile')
  async updateProfile(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) posUpdateUserProfileDto: PosUpdateUserProfileDto,
  ) {
    try {
      const { tenantId } = user;
      const updatedUser = await this.posUserService.update(posUpdateUserProfileDto, tenantId);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-password')
  async updatePassword(
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
    @Body(ParseObjectIdPipe) updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    const { tenantId, _id } = user;
    const updatedUser = await this.posUserService.updatePassword(_id, updatePasswordUserDto, tenantId);
    return {
      message: 'Cập nhật mật khẩu thành công.',
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(StripFields(['password']))
  @Post('update-user-field')
  async updateUserField(
    @Body(ParseObjectIdPipe) PosRequestUpdateUserFieldDto: PosRequestUpdateUserFieldDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId, _id } = user;
    const { fieldName, value } = PosRequestUpdateUserFieldDto;
    return this.posUserService.updateUserField(_id, fieldName, value, tenantId);
  }
}
