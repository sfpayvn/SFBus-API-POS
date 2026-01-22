import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PosSeatTypeDto, PosSearchSeatTypesQuerySortFilter, PosSearchSeatTypeRes } from './dto/pos-seat-type.dto';

@Injectable()
export class PosSeatTypeService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(SeatTypeDocument.name) private readonly seatTypeModel: Model<SeatTypeDocument>,
    @Inject(forwardRef(() => SeatTypeService))
    private readonly seatTypeService: SeatTypeService,
  ) {}

  async findAll(tenantIds: Types.ObjectId[]): Promise<PosSeatTypeDto[]> {
    return this.seatTypeService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosSeatTypeDto> {
    return this.seatTypeService.findOne(id, tenantIds);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PosSearchSeatTypesQuerySortFilter,
    filters: PosSearchSeatTypesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<PosSearchSeatTypeRes> {
    return this.seatTypeService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
    //// map xem cái nào thuộc tenant trong token cái nào thuộc teant default trong settings

    ///tenant trong setting thì filed isdefault = true
    /// tenant trong token thì field isdefault = false
    /// khi tìm kiếm thì tìm cả 2 loại
    /// khi tạo, sửa, xóa thì chỉ dc thao tác với loại tenant trong token (isdefault = false)
    /// khi lấy chi tiết cung chỉ dc lấy chi tiết của loại tenant trong token (isdefault = false)
    /// khi lấy all cung chỉ dc lấy all của loại tenant trong token (isdefault = false)
    // nếu isDefault = true thì không trả tenantId về client

    /// viết intercetor để check update cho các api create, update, delete, findOne xem có đúng tenant trong token và không phải tenant default trong settings (isdefault = true) nếu đúng thì cho phép thao tác, không thì throw lỗi
    /// viết intercetor để map lại response cho các api findOne, findAll, search nếu isdefault = true thì không trả tenantId về client
  }
}
