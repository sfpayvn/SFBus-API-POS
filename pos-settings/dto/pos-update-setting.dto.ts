import { PartialType } from '@nestjs/mapped-types';
import { PosCreateSettingDto } from './pos-create-setting.dto';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export class PosUpdateSettingDto extends PartialType(PosCreateSettingDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}
