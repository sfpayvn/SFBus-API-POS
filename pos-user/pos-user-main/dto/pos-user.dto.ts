import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PosUserAddressDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  addressType: string;

  @Expose()
  address: string;

  @Expose()
  isDefault: boolean;
}

export class PosUserDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  avatar: string;

  @Expose()
  avatarId: string;

  @Expose()
  password: string;

  @Expose()
  name: string;

  @Expose()
  addresses?: PosUserAddressDto[];

  @Expose()
  gender: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  birthdate?: Date;

  @Expose()
  roles: string[];

  @Expose()
  isEmailVerified: boolean;

  @Expose()
  isPhoneNumberVerified: boolean;

  @Expose()
  isLocked: boolean;

  @Exclude()
  resetTokenVersion: number;

  @Exclude()
  isDeleted: boolean;

  @Exclude()
  createdAt: Date;

  @Expose()
  isTempPassWord: boolean;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchUsersTypesQuery {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageIdx: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  sortBy: {
    key: string;
    value: string;
  };

  @IsOptional()
  filters: {
    key: string;
    value: string[];
  };
}

export class PosSearchUsersRes {
  pageIdx: number = 0;
  users: PosUserDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

export class PosRequestUpdateUserFieldDto {
  @IsNotEmpty()
  userId: Types.ObjectId;
  @IsNotEmpty()
  fieldName: string;
  @IsNotEmpty()
  value: any;
}
