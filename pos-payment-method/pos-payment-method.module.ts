import { forwardRef, Module } from '@nestjs/common';
import { PosPaymentMethodController } from './pos-payment-method.controller';
import { PosPaymentMethodService } from './pos-payment-method-service';
import { PaymentMethodModule } from '@/module/core/payment-method/payment-method.module';

@Module({
  imports: [forwardRef(() => PaymentMethodModule)],
  controllers: [PosPaymentMethodController],
  providers: [PosPaymentMethodService],
  exports: [PosPaymentMethodService],
})
export class PosPaymentMethodModule {}
