import { BusTemplateService } from '@/module/core/bus/bus-template/bus-template.service';
import { BusTemplateDocument } from '@/module/core/bus/bus-template/schema/bus-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PosBusTemplateDto,
  PosSearchBusTemplateQuerySortFilter,
  PosSearchBusTemplateRes,
} from './dto/pos-bus-template.dto';

@Injectable()
export class PosBusTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusTemplateDocument.name) private readonly busTemplateModel: Model<BusTemplateDocument>,
    @Inject(forwardRef(() => BusTemplateService)) private readonly busTemplateService: BusTemplateService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosBusTemplateDto[]> {
    return this.busTemplateService.findAll(tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusTemplateQuerySortFilter,
    filters: PosSearchBusTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<PosSearchBusTemplateRes> {
    return this.busTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
