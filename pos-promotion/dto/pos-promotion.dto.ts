import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import e from 'express';
import { Types } from 'mongoose';

export class PosPromotionDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  imageId: Types.ObjectId;

  @Expose()
  image: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  discountType: 'percentage' | 'fixed';

  @Expose()
  discountValue: number;

  @Expose()
  expireDate: Date;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosRedeemPromotionDto {
  bookingIds: Types.ObjectId[];
  userId: Types.ObjectId;
  promotionId: Types.ObjectId;
}

export class PosSearchPromotionPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchPromotionPagingQuery {
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
  sortBy: PosSearchPromotionPagingQuerySortFilter;

  @IsOptional()
  filters: PosSearchPromotionPagingQuerySortFilter[];
}

export class PosSearchPromotionPagingRes {
  pageIdx: number = 0;
  promotions: PosPromotionDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}

export class PosRequestPromotionByRule {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  bookingIds: Types.ObjectId[];
}

export class PosRequestPromotionMass {}
