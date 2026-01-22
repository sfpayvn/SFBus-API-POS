import { Module } from '@nestjs/common';
import { PosTrackingController } from './pos-tracking.controller';
import { PosTrackingService } from './pos-tracking.service';
import { TrackingModule } from '@/module/core/tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [PosTrackingController],
  providers: [PosTrackingService],
  exports: [PosTrackingService],
})
export class PosTrackingModule {}
