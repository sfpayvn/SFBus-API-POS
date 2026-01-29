import { BusRouteService } from '@/module/core/bus/bus-route/bus-route.service';
import { BusRouteDto } from '@/module/core/bus/bus-route/dto/bus-route.dto';
import { BusRouteDocument } from '@/module/core/bus/bus-route/schema/bus-route.schema';
import { forwardRef, Inject, Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PosBusRouteDto, PosSearchBusRouteQuerySortFilter, PosSearchBusRouteRes } from './dto/pos-bus-route.dto';

@Injectable()
export class PosBusRouteService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusRouteDocument.name) private readonly busRouteModel: Model<BusRouteDocument>,
    @Inject(forwardRef(() => BusRouteService))
    private readonly busRouteService: BusRouteService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosBusRouteDto[]> {
    return this.busRouteService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusRouteDto> {
    return this.busRouteService.findOne(id, tenantIds);
  }

  async findByStationId(stationId: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosBusRouteDto[]> {
    return this.busRouteService.findByStationId(stationId, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchBusRouteQuerySortFilter,
    filters: PosSearchBusRouteQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<PosSearchBusRouteRes> {
    return this.busRouteService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}
