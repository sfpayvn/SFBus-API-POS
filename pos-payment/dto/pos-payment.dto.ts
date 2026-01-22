import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class PosPaymentDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  referrentId: Types.ObjectId;

  @Expose()
  referrentNumber: string;

  @Expose()
  userId: Types.ObjectId;

  @Expose()
  promotionId?: Types.ObjectId;

  @Expose()
  paymentMethodId: Types.ObjectId;

  @Expose()
  paymentNumber: string;

  @Expose()
  referrentGroupNumber: string;

  @Expose()
  status: string;

  @Expose()
  paymentAmount: number; // S? ti?n kh�ch tr?

  @Expose()
  chargedAmount: number;

  @Exclude()
  transactionReferrentId: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export class PosRequestPaymentDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  paymentMethodId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  transactionId: string;

  @IsNotEmpty()
  @Type(() => String)
  referrentGroupNumber: string;

  @IsNotEmpty()
  @Type(() => Number)
  totalPrice: number;
}
