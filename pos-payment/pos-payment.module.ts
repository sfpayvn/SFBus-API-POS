import { PaymentDocument, PaymentSchema } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosPaymentService } from './pos-payment-service';
import { PosPaymentController } from './pos-payment.controller';
import { PaymentModule } from '@/module/core/payment/payment.module';
import { PosTrackingModule } from '../pos-tracking/pos-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PaymentDocument.name, schema: PaymentSchema }]),
    forwardRef(() => PaymentModule),
    PosTrackingModule,
  ],
  controllers: [PosPaymentController],
  providers: [PosPaymentService],
  exports: [PosPaymentService],
})
export class PosPaymentModule {}
