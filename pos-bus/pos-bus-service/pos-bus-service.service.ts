import { BusServiceService } from '@/module/core/bus/bus-service/bus-service.service';
import { UpdateBusServiceDto } from '@/module/core/bus/bus-service/dto/update-bus-service.dto';
import { BusServiceDocument } from '@/module/core/bus/bus-service/schema/bus-service.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PosBusServiceDto,
  PosSearchBusServicesQuerySortFilter,
  PosSearchBusServicesRes,
} from './dto/pos-bus-service.dto';

@Injectable()
export class PosBusServiceService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusServiceDocument.name) private readonly busServiceModel: Model<BusServiceDocument>,
    @Inject(forwardRef(() => BusServiceService))
    private readonly busServiceService: BusServiceService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosBusServiceDto[]> {
    return this.busServiceService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusServiceDto> {
    return this.busServiceService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusServicesQuerySortFilter,
    filters: PosSearchBusServicesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<PosSearchBusServicesRes> {
    return this.busServiceService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
