import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class PosGoodsCategoryDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  icon: string;

  @Expose()
  iconId: Types.ObjectId;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosSearchGoodsCategoryPagingQuerySortFilter {
  @IsOptional()
  key: string;

  @IsOptional()
  value: string;
}

export class PosSearchGoodsCategoryPagingQuery {
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
  sortBy: PosSearchGoodsCategoryPagingQuerySortFilter;

  @IsOptional()
  filters: PosSearchGoodsCategoryPagingQuerySortFilter[];
}

export class PosSearchGoodsPagingRes {
  pageIdx: number = 0;
  goodsCategories: PosGoodsCategoryDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
