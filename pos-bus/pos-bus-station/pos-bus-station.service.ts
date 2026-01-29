import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusStationDocument } from '@/module/core/bus/bus-station/schema/bus-station.schema';
import { BusStationService } from '@/module/core/bus/bus-station/bus-station.service';
import {
  PosBusStationDto,
  PosSearchBusStationsQuerySortFilter,
  PosSearchBusStationsRes,
} from './dto/pos-bus-station.dto';

@Injectable()
export class PosBusStationService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusStationDocument.name) private readonly busStationModel: Model<BusStationDocument>,
    @Inject(forwardRef(() => BusStationService))
    private readonly busStationService: BusStationService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosBusStationDto[]> {
    return this.busStationService.findAll(tenantIds);
  }

  async findAllAvailable(tenantIds: Types.ObjectId[]): Promise<PosBusStationDto[]> {
    return this.busStationService.findAllAvailable(tenantIds);
  }

  async findOffices(tenantIds: Types.ObjectId[]): Promise<PosBusStationDto[]> {
    return this.busStationService.findOffices(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusStationDto> {
    return this.busStationService.findOne(id, tenantIds);
  }

  async findOneByProvinceId(provinceId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusStationDto> {
    return this.busStationService.findOneByProvinceId(provinceId, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusStationsQuerySortFilter,
    filters: PosSearchBusStationsQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<PosSearchBusStationsRes> {
    return this.busStationService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
