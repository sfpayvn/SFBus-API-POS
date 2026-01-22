import { BookingDocument, BookingSchema } from '@/module/core/booking/schema/booking.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosBookingController } from './pos-booking.controller';
import { PosBookingService } from './pos-booking-service';
import { PosBookingGateway } from './pos-booking.gateway';
import { BookingModule } from '@/module/core/booking/booking.module';
import { PosPaymentModule } from '../pos-payment/pos-payment.module';
import { PosTrackingModule } from '../pos-tracking/pos-tracking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookingDocument.name, schema: BookingSchema }]),
    forwardRef(() => BookingModule),
    forwardRef(() => PosPaymentModule),
    forwardRef(() => PosPaymentModule),
    forwardRef(() => PosTrackingModule),
  ],
  controllers: [PosBookingController],
  providers: [PosBookingService, PosBookingGateway],
  exports: [PosBookingService],
})
export class PosBookingModule {}
