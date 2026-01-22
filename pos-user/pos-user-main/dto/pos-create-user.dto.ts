import { IsNotEmpty, IsString, IsOptional, IsEmail, IsEnum, IsDateString, IsBoolean, isBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class PosCreateUserAddressDto {
  addressType: string;
  address: string;
  isDefault: boolean;
}

export class PosCreateUserDto {
  @IsOptional()
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  avatarId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  roles: string[];

  @IsOptional()
  addresses?: PosCreateUserAddressDto[];

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], {
    message: 'Gi?i t�nh ph?i l� male, female ho?c other.',
  })
  gender: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified: boolean;

  @IsOptional()
  @IsDateString()
  birthdate?: string; // Sử dụng ISO String cho ngày tháng

  @IsNotEmpty()
  @IsBoolean()
  isTempPassWord: boolean; // Sử dụng ISO String cho ngày tháng

  resetTokenVersion: number;
}
