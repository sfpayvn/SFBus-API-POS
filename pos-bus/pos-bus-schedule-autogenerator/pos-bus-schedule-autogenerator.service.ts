// src/bus-schedule/bus-schedule.service.ts
import { BusScheduleAutogeneratorService } from '@/module/core/bus/bus-schedule-autogenerator/bus-schedule-autogenerator.service';
import { BusScheduleAutogeneratorDto } from '@/module/core/bus/bus-schedule-autogenerator/dto/bus-schedule-autogenerator.dto';
import { CreateBusScheduleAutogeneratorDto } from '@/module/core/bus/bus-schedule-autogenerator/dto/create-bus-schedule-autogenerator.dto';
import {
  BusScheduleAutogeneratorDocument,
  SpecificTimeSlotDocument,
} from '@/module/core/bus/bus-schedule-autogenerator/schema/bus-schedule-autogenerator.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import {
  PosBusScheduleAutogeneratorDto,
  PosSearchBusSchedulePagingQuerySortFilter,
  PosSearchBusScheduleRes,
} from './dto/pos-bus-schedule-autogenerator.dto';
import { PosCreateBusScheduleAutogeneratorDto } from './dto/pos-create-bus-schedule-autogenerator.dto';
import { PosUpdateBusScheduleAutogeneratorDto } from './dto/pos-update-bus-schedule-autogenerator.dto';

@Injectable()
export class PosBusScheduleAutogeneratorService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleAutogeneratorDocument.name)
    private busScheduleAutogeneratorModel: Model<BusScheduleAutogeneratorDocument>,
    @Inject(forwardRef(() => BusScheduleAutogeneratorService))
    private readonly busScheduleAutogeneratorService: BusScheduleAutogeneratorService,
  ) {}

  async create(
    PosCreateBusScheduleAutogeneratorDto: PosCreateBusScheduleAutogeneratorDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<PosBusScheduleAutogeneratorDto> {
    return this.busScheduleAutogeneratorService.create(PosCreateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
  }

  async update(
    PosUpdateBusScheduleAutogeneratorDto: PosUpdateBusScheduleAutogeneratorDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<BusScheduleAutogeneratorDto> {
    return this.busScheduleAutogeneratorService.update(PosUpdateBusScheduleAutogeneratorDto, tenantId, timezoneOffset);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.busScheduleAutogeneratorService.delete(id, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<PosBusScheduleAutogeneratorDto[]> {
    return this.busScheduleAutogeneratorService.findAll(tenantId);
  }

  async searchBusScheduleAutogenerator(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusSchedulePagingQuerySortFilter,
    filters: PosSearchBusSchedulePagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchBusScheduleRes> {
    return this.busScheduleAutogeneratorService.searchBusScheduleAutogenerator(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
  }

  generateSchedulesForToday(tenantId: Types.ObjectId, timezoneOffset: number): Promise<void> {
    return this.busScheduleAutogeneratorService.generateSchedulesForToday(tenantId, timezoneOffset);
  }
}
