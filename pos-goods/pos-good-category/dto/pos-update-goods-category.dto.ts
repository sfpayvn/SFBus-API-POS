import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { PosCreateGoodsCategoryDto } from './pos-create-goods-category.dto';
import { Type } from 'class-transformer';

export class PosUpdateGoodsCategoryDto extends PartialType(PosCreateGoodsCategoryDto) {
  @IsNotEmpty()
  @Type(() => String)
  _id: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}
