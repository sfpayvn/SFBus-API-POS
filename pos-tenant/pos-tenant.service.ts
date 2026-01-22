import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TenantService } from '../../core/tenant/tenant.service';

@Injectable()
export class PosTenantService {
  constructor(@Inject(forwardRef(() => TenantService)) private readonly tenantService: TenantService) {}

  async findByCode(code: string) {
    return this.tenantService.findByCode(code);
  }
}
