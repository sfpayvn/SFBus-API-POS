// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleTemplateDocument } from '@/module/core/bus/bus-schedule-template/schema/bus-schedule-template.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusScheduleTemplateService } from '@/module/core/bus/bus-schedule-template/bus-schedule-template.service';
import {
  PosBusScheduleTemplateDto,
  PosSearchBusScheduleTemplateQuery,
  PosSearchBusScheduleTemplateQuerySortFilter,
} from './dto/pos-bus-schedule-template.dto';

@Injectable()
export class PosBusScheduleTemplateService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusScheduleTemplateDocument.name) private BusScheduleTemplateModel: Model<BusScheduleTemplateDocument>,
    @Inject(forwardRef(() => BusScheduleTemplateService))
    private readonly busScheduleTemplateService: BusScheduleTemplateService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosBusScheduleTemplateDto[]> {
    return this.busScheduleTemplateService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusScheduleTemplateDto> {
    return this.busScheduleTemplateService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusScheduleTemplateQuerySortFilter,
    filters: PosSearchBusScheduleTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ) {
    return this.busScheduleTemplateService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
