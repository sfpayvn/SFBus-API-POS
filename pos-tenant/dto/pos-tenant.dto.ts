import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PosPaymentDto } from '../../pos-payment/dto/pos-payment.dto';

export class PosTenantSettingDto {
  @Expose()
  readonly appearance: string;

  @Expose()
  readonly timezone: string;
}

export class PosTenantDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  readonly code: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly email?: string;

  @Expose()
  readonly address?: string;

  @Expose()
  readonly logo?: string;

  @Expose()
  readonly setting: PosTenantSettingDto;

  @Expose()
  subscriptionId?: Types.ObjectId;

  @Expose()
  readonly status?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchTenantQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchTenantQuery {
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
  sortBy: PosSearchTenantQuerySortFilter;

  @IsOptional()
  filters: PosSearchTenantQuerySortFilter[];
}

export class PosSearchTenantsRes {
  pageIdx: number = 0;
  tenants: PosTenantDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
