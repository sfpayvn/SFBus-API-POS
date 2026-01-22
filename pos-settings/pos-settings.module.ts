import { Module } from '@nestjs/common';
import { PosSettingsController } from './pos-settings.controller';
import { SettingsModule } from '../../core/settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [PosSettingsController],
})
export class PosSettingsModule {}
