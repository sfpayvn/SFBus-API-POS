import { BusDocument } from '@/module/core/bus/bus/schema/bus.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PosBusDto, PosSearchBusQuerySortFilter, PosSearchBusRes } from './dto/pos-bus.dto';
import { BusService } from '@/module/core/bus/bus/bus.service';

@Injectable()
export class PosBusService {
  constructor(
    @InjectModel(BusDocument.name) private readonly busModel: Model<BusDocument>,
    @Inject(forwardRef(() => BusService))
    private readonly busService: BusService,
  ) {}

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBusDto | null> {
    return this.busService.findOne(id, tenantId);
  }

  async findByBusTemplate(
    busTemplateId: Types.ObjectId,
    tenantId: Types.ObjectId,
    rootTenantId: Types.ObjectId,
  ): Promise<PosBusDto[]> {
    return this.busService.findByBusTemplate(busTemplateId, tenantId, rootTenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<PosBusDto[]> {
    return this.busService.findAll(tenantId);
  }
}
