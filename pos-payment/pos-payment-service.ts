import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PosPaymentDto, PosRequestPaymentDto } from './dto/pos-payment.dto';
import { PaymentService } from '@/module/core/payment/payment-service';
import { PosTrackingService } from '../pos-tracking/pos-tracking.service';
import { TRACKING_TYPES } from '@/module/core/tracking/constants/tracking-types';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class PosPaymentService {
  constructor(
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    private readonly posTrackingService: PosTrackingService,
  ) {}

  async processBookingPayment(
    posRequestPaymentDto: PosRequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<PosPaymentDto[]> {
    const payments = await this.paymentService.processBookingPayment(posRequestPaymentDto, tenantId);

    for (const payment of payments) {
      // Cập nhật trạng thái booking tương ứng

      await this.posTrackingService.create(
        {
          type: TRACKING_TYPES.PAYMENT_BOOKING_PROCESSED,
           platform: ROLE_CONSTANTS.POS,
          metadata: {
            bookingId: payment.referrentId,
            paymentId: payment._id,
            paymentStatus: payment.status,
            paymentMethodId: payment.paymentMethodId,
            chargedAmount: payment.chargedAmount,
            paymentAmount: payment.paymentAmount,
          },
          createdBy,
        },
        tenantId,
      );
    }

    return payments;
  }

  async processGoodsPayment(
    posRequestPaymentDto: PosRequestPaymentDto,
    tenantId: Types.ObjectId,
    createdBy: Types.ObjectId,
  ): Promise<PosPaymentDto> {
    const payment = await this.paymentService.processGoodsPayment(posRequestPaymentDto, tenantId, createdBy);

    await this.posTrackingService.create(
      {
        type: TRACKING_TYPES.PAYMENT_GOODS_PROCESSED,
         platform: ROLE_CONSTANTS.POS,
        metadata: {
          goodsId: payment.referrentId,
          paymentId: payment._id,
          paymentStatus: payment.status,
          paymentMethodId: payment.paymentMethodId,
          chargedAmount: payment.chargedAmount,
          paymentAmount: payment.paymentAmount,
        },
        createdBy,
      },
      tenantId,
    );

    return payment;
  }

  async findAllByReferrentId(referrentId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosPaymentDto[]> {
    return this.paymentService.findAllByReferrentId(referrentId, tenantId);
  }
}
