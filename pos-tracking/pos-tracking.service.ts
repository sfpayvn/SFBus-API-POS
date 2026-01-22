import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TrackingService } from '@/module/core/tracking/tracking.service';
import { CreateTrackingDto } from '@/module/core/tracking/dto/create-tracking.dto';
import { UpdateTrackingDto } from '@/module/core/tracking/dto/update-tracking.dto';
import { TrackingDto, SearchTrackingQuerySortFilter, SearchTrackingRes } from '@/module/core/tracking/dto/tracking.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class PosTrackingService {
  constructor(private readonly trackingService: TrackingService) {}

  async create(createTrackingDto: CreateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto> {
    return this.trackingService.create({ ...createTrackingDto, platform: ROLE_CONSTANTS.POS }, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<TrackingDto[]> {
    return this.trackingService.findAll(tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<TrackingDto> {
    return this.trackingService.findOne(id, tenantId);
  }

  async findByType(type: string, tenantId: Types.ObjectId): Promise<TrackingDto[]> {
    return this.trackingService.findByType(type, tenantId);
  }

  async update(updateTrackingDto: UpdateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto> {
    return this.trackingService.update(updateTrackingDto, tenantId);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.trackingService.remove(id, tenantId);
  }

  async searchTracking(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchTrackingQuerySortFilter,
    filters: SearchTrackingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchTrackingRes> {
    return this.trackingService.searchTracking(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}
