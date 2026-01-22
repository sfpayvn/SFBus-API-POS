import { GoodsCategoryService } from '@/module/core/goods/good-category/goods-category-service';
import { GoodsCategoryDocument } from '@/module/core/goods/good-category/schema/goods.-categoryschema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import {
  PosGoodsCategoryDto,
  PosSearchGoodsCategoryPagingQuerySortFilter,
  PosSearchGoodsPagingRes,
} from './dto/pos-goods-category.dto';
import { PosCreateGoodsCategoryDto } from './dto/pos-create-goods-category.dto';
import { PosUpdateGoodsCategoryDto } from './dto/pos-update-goods-category.dto';

@Injectable()
export class PosGoodsCategoryService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsCategoryDocument.name) private readonly goodsCategoryModel: Model<GoodsCategoryDocument>,
    @Inject(forwardRef(() => GoodsCategoryService))
    private readonly goodsCategoryService: GoodsCategoryService,
  ) {}

  async create(
    PosCreateGoodsCategoryDto: PosCreateGoodsCategoryDto,
    tenantId: Types.ObjectId,
  ): Promise<PosGoodsCategoryDto> {
    return this.goodsCategoryService.create(PosCreateGoodsCategoryDto, tenantId);
  }

  async update(
    PosUpdateGoodsCategoryDto: PosUpdateGoodsCategoryDto,
    tenantId: Types.ObjectId,
  ): Promise<PosGoodsCategoryDto> {
    return this.goodsCategoryService.update(PosUpdateGoodsCategoryDto, tenantId);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.goodsCategoryService.remove(id, tenantId);
  }

  async findByIds(
    ids: Types.ObjectId[],
    tenantId: Types.ObjectId,
    rootTenantId: Types.ObjectId,
  ): Promise<PosGoodsCategoryDto[]> {
    return this.goodsCategoryService.findByIds(ids, [tenantId, rootTenantId]);
  }

  async findAll(tenantId: Types.ObjectId): Promise<PosGoodsCategoryDto[]> {
    return this.goodsCategoryService.findAll(tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<PosGoodsCategoryDto> {
    return this.goodsCategoryService.findOne(id, tenantId);
  }

  async searchGoodsCategoryPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchGoodsCategoryPagingQuerySortFilter,
    filters: PosSearchGoodsCategoryPagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchGoodsPagingRes> {
    return this.goodsCategoryService.searchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
