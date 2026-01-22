import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PosCreateGoodsDto } from './pos-create-goods.dto';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Optional } from '@nestjs/common';

export class PosUpdateGoodsDto extends PartialType(PosCreateGoodsDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

export class PosRequestUpdateGoodsScheduleAssignmentDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  goodIds: Types.ObjectId[];

  @IsOptional()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId | null;
}
