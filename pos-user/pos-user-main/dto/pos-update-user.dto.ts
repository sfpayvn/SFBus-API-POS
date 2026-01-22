import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsOptional, IsString, IsEmail, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
import { PosCreateUserAddressDto, PosCreateUserDto } from './pos-create-user.dto';

export class PosUpdateUserDto extends PartialType(PosCreateUserDto) {
  _id: Types.ObjectId;
  isEmailVerified: boolean = false;
  isLocked: boolean = false;
  isDeleted: boolean = false;
}

export class PosUpdateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  avatarId?: Types.ObjectId;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  addresses?: PosCreateUserAddressDto[];

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Giới tính không đúng',
  })
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string; // Sử dụng ISO String cho ngày tháng
}

export class PosUpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
