import { Module } from '@nestjs/common';
import { PosTenantService } from './pos-tenant.service';
import { TenantModule } from '../../core/tenant/tenant.module';

@Module({
  imports: [TenantModule],
  providers: [PosTenantService],
  exports: [PosTenantService],
})
export class PosTenantModule {}
