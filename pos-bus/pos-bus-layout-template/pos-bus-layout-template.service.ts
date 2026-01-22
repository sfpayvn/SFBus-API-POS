// bus-template.service.ts

import {
  BusLayoutTemplateDto,
  SearchBusLayoutTemplateQuerySortFilter,
} from '@/module/core/bus/bus-layout-template/dto/bus-layout-template.dto';
import { BusLayoutTemplateDocument } from '@/module/core/bus/bus-layout-template/schema/bus-layout-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PosBusLayoutTemplateDto, PosSearchBusTemplateRes } from './dto/pos-bus-layout-template.dto';
import { BusLayoutTemplateService } from '@/module/core/bus/bus-layout-template/bus-layout-template.service';

@Injectable()
export class PosBusLayoutTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusLayoutTemplateDocument.name) private busLayoutTemplateModel: Model<BusLayoutTemplateDocument>,
    @Inject(forwardRef(() => BusLayoutTemplateService))
    private readonly busLayoutTemplateService: BusLayoutTemplateService,
  ) {}
  async findAll(tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto[]> {
    return await this.busLayoutTemplateService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusLayoutTemplateDto> {
    return this.busLayoutTemplateService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusLayoutTemplateQuerySortFilter,
    filters: SearchBusLayoutTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<PosSearchBusTemplateRes> {
    return this.busLayoutTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
