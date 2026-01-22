import { Module } from '@nestjs/common';
import { PosReportController } from './pos-report.controller';
import { ReportModule } from '../../core/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [PosReportController],
})
export class PosReportModule {}
