import { Types } from 'mongoose';
import { PosBusLayoutTemplateDto } from '../../pos-bus-layout-template/dto/pos-bus-layout-template.dto';

export class PosBusScheduleLayoutSeatDto {
  _id: Types.ObjectId;
  bookingId: Types.ObjectId;
  index: number;
  typeId: Types.ObjectId;
  name: string;
  status: string;
  bookingStatus: string;
}

export class PosBusScheduleSeatLayoutTemplateDto {
  _id: Types.ObjectId;
  name: string;
  seats: PosBusScheduleLayoutSeatDto[];
}

export class PosBusScheduleLayoutDto extends PosBusLayoutTemplateDto {
  busLayoutTemplateId: Types.ObjectId;
  busScheduleId: Types.ObjectId;
  seatLayouts: PosBusScheduleSeatLayoutTemplateDto[];
}

export class PosRequestUpdateSeatStatusDto {
  _id: Types.ObjectId;
  status: string;
  bookingStatus?: string;
  bookingId?: Types.ObjectId;
}
