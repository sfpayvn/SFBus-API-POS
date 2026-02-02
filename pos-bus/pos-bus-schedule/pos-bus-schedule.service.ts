// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleService } from '@/module/core/bus/bus-schedule/bus-schedule.service';
import { BusScheduleDocument } from '@/module/core/bus/bus-schedule/schema/bus-schedule.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { customAlphabet } from 'nanoid';
import {
  PosBusScheduleDto,
  PosSearchBusSchedulePagingQuerySortFilter,
  PosSearchBusSchedulePagingRes,
} from './dto/pos-bus-schedule.dto';
import { PosUpdateBusScheduleDto } from './dto/pos-update-bus-schedule.dto';
import { EVENT_STATUS } from '@/common/constants/status.constants';

@Injectable()
export class PosBusScheduleService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleDocument.name) private busScheduleModel: Model<BusScheduleDocument>,
    @Inject(forwardRef(() => BusScheduleService)) private readonly busScheduleService: BusScheduleService,
  ) {}

  async update(updateBusScheduleDto: PosUpdateBusScheduleDto, tenantId: Types.ObjectId): Promise<PosBusScheduleDto> {
    return this.busScheduleService.update(updateBusScheduleDto, tenantId);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBusScheduleDto> {
    return this.busScheduleService.findOne(id, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<PosBusScheduleDto[]> {
    const filters: PosSearchBusSchedulePagingQuerySortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: 'scheduled',
    };

    filters.push(filterByStatus);

    return this.busScheduleService.findAll(tenantId, filters);
  }

  async searchBusSchedulePaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusSchedulePagingQuerySortFilter,
    filters: PosSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchBusSchedulePagingRes> {
    filters.push({
      key: 'status',
      value: [EVENT_STATUS.SCHEDULED, EVENT_STATUS.IN_PROGRESS, EVENT_STATUS.COMPLETED, EVENT_STATUS.OVERDUE],
    });
    return this.busScheduleService.searchBusSchedulePaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }

  async searchBusScheduleDeparture(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusSchedulePagingQuerySortFilter,
    filters: PosSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchBusSchedulePagingRes> {
    filters.push({
      key: 'status',
      value: [EVENT_STATUS.SCHEDULED, EVENT_STATUS.IN_PROGRESS, EVENT_STATUS.COMPLETED, EVENT_STATUS.OVERDUE],
    });
    return this.busScheduleService.searchBusScheduleDeparture(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }

  async searchBusScheduleArrival(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusSchedulePagingQuerySortFilter,
    filters: PosSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchBusSchedulePagingRes> {
    filters.push({
      key: 'status',
      value: [EVENT_STATUS.SCHEDULED, EVENT_STATUS.IN_PROGRESS, EVENT_STATUS.COMPLETED, EVENT_STATUS.OVERDUE],
    });
    return this.busScheduleService.searchBusScheduleArrival(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }

  async updateCurrentStation(
    busScheduleId: Types.ObjectId,
    currentStationId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<PosBusScheduleDto> {
    return this.busScheduleService.updateCurrentStation(busScheduleId, currentStationId, tenantId);
  }
}
