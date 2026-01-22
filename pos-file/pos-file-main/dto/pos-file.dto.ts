import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class PosFileDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  link: string;

  @Expose()
  filename: string;

  @Expose()
  contentType: string;

  @Expose()
  folderId: Types.ObjectId;

  @Expose()
  isFavorite: boolean;

  @Expose()
  isDefault?: boolean;

  @Exclude()
  uploadDate?: Date;

  @Exclude()
  md5?: string;

  @Exclude()
  length?: number;

  @Exclude()
  chunkSize?: number;

  @Exclude()
  metadata?: any;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  __v?: number;
}

export class PosSearchFilesQuerySortFilter {
  key: string;
  value: string;
}

export class PosSearchFilesQuery {
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
  sortBy: PosSearchFilesQuerySortFilter;

  @IsOptional()
  filters: PosSearchFilesQuerySortFilter[];

  @IsOptional()
  @IsString()
  fileFolderId: Types.ObjectId | null;
}

export class PosSearchFilesRes {
  pageIdx: number = 0;
  files: PosFileDto[];
  totalPage: number = 0;
  totalItem: number = 0;
}
