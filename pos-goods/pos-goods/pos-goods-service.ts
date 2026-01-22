import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GoodsDto } from '@/module/core/goods/goods/dto/goods.dto';
import { PosCreateGoodsDto } from './dto/pos-create-goods.dto';
import { PosGoodsDto, PosGoodsSortFilter, PosSearchGoodsPagingRes } from './dto/pos-goods.dto';
import { PosRequestUpdateGoodsScheduleAssignmentDto, PosUpdateGoodsDto } from './dto/pos-update-goods.dto';
import { GoodsService } from '@/module/core/goods/goods/goods-service';
import { PosTrackingService } from '../../pos-tracking/pos-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { plainToInstance } from 'class-transformer';
import { GOODS_STATUS } from '@/common/constants/status.constants';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class PosGoodsService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsDocument.name) private readonly goodsModel: Model<GoodsDocument>,
    @Inject(forwardRef(() => GoodsService))
    private readonly goodsService: GoodsService,

    @Inject(forwardRef(() => PosTrackingService))
    private readonly posTrackingService: PosTrackingService,
  ) {}

  async create(
    PosCreateGoodsDto: PosCreateGoodsDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<PosGoodsDto> {
    const goodsDto = await this.goodsService.create(PosCreateGoodsDto, tenantId);
    await this.posTrackingService.create(
      {
        type: TRACKING_TYPES.GOODS_CREATED,
        platform: ROLE_CONSTANTS.POS,
        metadata: {
          goodsId: goodsDto._id,
          goodsName: goodsDto.name,
          busRouteId: goodsDto.busRouteId,
          busScheduleId: goodsDto.busScheduleId,
        },
        createdBy: createdBy,
      },
      tenantId,
    );

    return goodsDto;
  }

  async update(
    PosUpdateGoodsDto: PosUpdateGoodsDto,
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<PosGoodsDto> {
    const goodsDto = await this.goodsService.update(PosUpdateGoodsDto, tenantId);
    const changes = this.prepareChanges(PosUpdateGoodsDto, goodsDto._oldData);

    await this.posTrackingService.create(
      {
        type: TRACKING_TYPES.GOODS_UPDATED,
        platform: ROLE_CONSTANTS.POS,
        metadata: {
          goodsId: goodsDto._id,
          goodsName: goodsDto.name,
          busRouteId: goodsDto.busRouteId,
          busScheduleId: goodsDto.busScheduleId,
          oldValue: goodsDto._oldData ? JSON.stringify(goodsDto._oldData) : null,
          newValue: JSON.stringify(goodsDto),
          changes: JSON.stringify(changes),
          updatedFields: Object.keys(changes),
        },
        createdBy: updatedBy,
      },
      tenantId,
    );
    if (goodsDto && goodsDto._oldData) delete goodsDto._oldData;

    return goodsDto;
  }

  async updates(
    PosUpdateGoodsDto: PosUpdateGoodsDto[],
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<PosGoodsDto[]> {
    const goodsesDto = await this.goodsService.updates(PosUpdateGoodsDto, tenantId);

    for (const goodsDto of goodsesDto) {
      const changes = this.prepareChanges(goodsDto, goodsDto._oldData);

      await this.posTrackingService.create(
        {
          type: TRACKING_TYPES.GOODS_UPDATED,
          platform: ROLE_CONSTANTS.POS,
          metadata: {
            goodsId: goodsDto._id,
            goodsName: goodsDto.name,
            busRouteId: goodsDto.busRouteId,
            busScheduleId: goodsDto.busScheduleId,
            oldValue: goodsDto._oldData ? JSON.stringify(goodsDto._oldData) : null,
            newValue: JSON.stringify(goodsDto),
            changes: changes ? JSON.stringify(changes) : null,
            updatedFields: changes ? Object.keys(changes) : [],
          },
          createdBy: updatedBy,
        },
        tenantId,
      );

      if (goodsDto && goodsDto._oldData) delete goodsDto._oldData;
    }
    return goodsesDto;
  }

  async remove(id: string, tenantId: Types.ObjectId, deletedBy: Types.ObjectId): Promise<boolean> {
    const goodsDto = await this.goodsService.remove(id, tenantId);
    await this.posTrackingService.create(
      {
        type: TRACKING_TYPES.GOODS_DELETED,
        platform: ROLE_CONSTANTS.POS,
        metadata: {},
        createdBy: deletedBy,
      },
      tenantId,
    );

    return goodsDto;
  }

  async findAll(tenantId: Types.ObjectId): Promise<PosGoodsDto[]> {
    return this.goodsService.findAll(tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId) {
    return this.goodsService.findOne(id, tenantId);
  }

  async findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<GoodsDto[]> {
    return this.goodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
  }

  async findAllGoodsAvailable(busRouteId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosGoodsDto[]> {
    const filters: PosGoodsSortFilter[] = [];

    const filterByStatus = {
      key: 'status',
      value: [GOODS_STATUS.NEW],
    };

    filters.push(filterByStatus);
    return this.goodsService.findAllGoodsAvailable(busRouteId, tenantId, filters);
  }

  async searchGoodsPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosGoodsSortFilter,
    filters: PosGoodsSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<PosSearchGoodsPagingRes> {
    return this.goodsService.searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }

  async updatesGoodsScheduleAssignment(
    posRequestUpdateGoodsScheduleAssignmentDto: PosRequestUpdateGoodsScheduleAssignmentDto[],
    tenantId: Types.ObjectId,
    updatedBy: Types.ObjectId,
  ): Promise<PosGoodsDto[]> {
    const goodses = await this.goodsService.updatesGoodsScheduleAssignment(
      posRequestUpdateGoodsScheduleAssignmentDto,
      tenantId,
    );

    // Tạo tracking cho từng goods
    for (const goodsDto of goodses) {
      await this.posTrackingService.create(
        {
          type: TRACKING_TYPES.GOODS_ASSIGNMENT,
          platform: ROLE_CONSTANTS.POS,
          metadata: {
            goodsId: goodsDto._id,
            goodsName: goodsDto.name,
            busRouteId: goodsDto.busRouteId,
            busScheduleId: goodsDto.busScheduleId,
          },
          createdBy: updatedBy,
        },
        tenantId,
      );
    }

    return goodses;
  }

  private prepareChanges(updateDto: any, oldData: any): Record<string, { oldValue: any; newValue: any }> {
    const changes: Record<string, { oldValue: any; newValue: any }> = {};
    Object.keys(updateDto).forEach((key) => {
      if (key !== '_id' && oldData && oldData[key] !== undefined) {
        const oldValue = oldData[key];
        const newValue = updateDto[key];
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          changes[key] = {
            oldValue,
            newValue,
          };
        }
      }
    });
    return changes;
  }
}
