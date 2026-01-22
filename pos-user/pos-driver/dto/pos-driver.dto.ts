import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { PosUserDto } from '../../pos-user-main/dto/pos-user.dto';

export class PosDriverDto extends PosUserDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  userId: Types.ObjectId;

  @Expose()
  licenseNumber: string;

  @Expose()
  licenseExpirationDate: Date;

  @Expose()
  licenseType: string;

  @Expose()
  licenseImage: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchDriversQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchDriversQuery {
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
  sortBy: PosSearchDriversQuerySortFilter;

  @IsOptional()
  @IsString()
  filters: PosSearchDriversQuerySortFilter[];
}

export class PosSearchDriversRes {
  pageIdx: number = 0;
  userDrivers: PosDriverDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
