import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class PosCreatePaymentDto {
  tenantId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  referrentId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  referrentNumber: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  userId: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  promotionId?: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  paymentNumber: string;

  @IsNotEmpty()
  @Type(() => String)
  status: string;

  @IsNotEmpty()
  @Type(() => Number)
  paymentAmount: number; // Số tiền khách trả

  @IsNotEmpty()
  @Type(() => Number)
  chargedAmount: number;

  @IsOptional()
  @Type(() => String)
  transactionReferrentId: string;
}
