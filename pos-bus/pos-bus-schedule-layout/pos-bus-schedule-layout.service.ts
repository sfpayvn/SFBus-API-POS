// bus-template.service.ts

import { BusScheduleLayoutService } from '@/module/core/bus/bus-schedule-layout/bus-schedule-layout.service';
import { BusScheduleLayoutDto } from '@/module/core/bus/bus-schedule-layout/dto/bus-schedule-layout.dto';
import { BusScheduleLayoutDocument } from '@/module/core/bus/bus-schedule-layout/schema/bus-schedule-layout.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { PosBusScheduleLayoutDto } from './dto/pos-bus-schedule-layout.dto';

@Injectable()
export class PosBusScheduleLayoutService {
  constructor(
    @InjectModel(BusScheduleLayoutDocument.name)
    private readonly busScheduleLayoutModel: Model<BusScheduleLayoutDocument>,
    @Inject(forwardRef(() => BusScheduleLayoutService))
    private readonly busScheduleLayoutService: BusScheduleLayoutService,
  ) {}

  async findAll(tenantId: Types.ObjectId): Promise<PosBusScheduleLayoutDto[]> {
    const templates = await this.busScheduleLayoutModel.find({ tenantId }).populate('seatLayouts').lean().exec();
    return templates.map((template) => plainToInstance(BusScheduleLayoutDto, template));
  }

  async findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.findOne(busScheduleId, tenantId);
  }

  async findOneByBusSchedule(
    busScheduleId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<PosBusScheduleLayoutDto> {
    return this.busScheduleLayoutService.findOneByBusSchedule(busScheduleId, tenantId);
  }
}
