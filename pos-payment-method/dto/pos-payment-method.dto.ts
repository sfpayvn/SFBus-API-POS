import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PosBookingDto } from '../../pos-booking/dto/pos-booking.dto';

export class PosPaymentBankingDto {
  @Expose()
  providerId: Types.ObjectId;

  @Expose()
  token: string;

  @Expose()
  bankName: string;

  @Expose()
  accountNumber: string;

  @Expose()
  accountName: string;
}

export class PosPaymentMethodDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  providerId: Types.ObjectId;

  @Expose()
  token: string;

  @Expose()
  name: string;

  @Expose()
  banking?: PosPaymentBankingDto;

  @Expose()
  type: string;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  image: string;

  @Expose()
  note?: string;

  @Expose()
  status: string;

  @Expose()
  isDefault?: boolean;

  @Expose()
  isPaymentMethodDefault?: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosPaymentMethodSortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchPaymentMethodPagingQuery {
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
  sortBy: PosPaymentMethodSortFilter;

  @IsOptional()
  filters: PosPaymentMethodSortFilter[];
}

export class PosSearchPaymentMethodPagingRes {
  pageIdx: number = 0;
  paymentMethods: PosPaymentMethodDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
