import { Module } from '@nestjs/common';
import { PosPaymentModule } from './pos-payment/pos-payment.module';
import { PosBookingModule } from './pos-booking/pos-booking.module';
import { BusTypeModule } from '../core/bus/bus-type/bus-type.module';
import { PosBusScheduleAutogeneratorModule } from './pos-bus/pos-bus-schedule-autogenerator/pos-bus-schedule-autogenerator.module';
import { PosBusScheduleLayoutModule } from './pos-bus/pos-bus-schedule-layout/pos-bus-schedule-layout.module';
import { PosBusScheduleTemplateModule } from './pos-bus/pos-bus-schedule-template/pos-bus-schedule-template.module';
import { PosBusLayoutTemplateModule } from './pos-bus/pos-bus-layout-template/pos-bus-layout-template.module';
import { PosBusProvinceModule } from './pos-bus/pos-bus-province/pos-bus-province.module';
import { PosBusRouteModule } from './pos-bus/pos-bus-route/pos-bus-route.module';
import { PosBusScheduleModule } from './pos-bus/pos-bus-schedule/pos-bus-schedule.module';
import { PosBusServiceModule } from './pos-bus/pos-bus-service/pos-bus-service.module';
import { PosBusTemplateModule } from './pos-bus/pos-bus-template/pos-bus-template.module';
import { PosBusTypeModule } from './pos-bus/pos-bus-type/pos-bus-type.module';
import { PosBusModule } from './pos-bus/pos-bus-main/pos-bus.module';
import { PosNotificationModule } from './pos-notification/pos-notification.module';
import { PosPromotionModule } from './pos-promotion/pos-promotion.module';
import { PosDriverModule } from './pos-user/pos-driver/pos-driver.module';
import { PosUserModule } from './pos-user/pos-user-main/pos-user.module';
import { PosBusStationModule } from './pos-bus/pos-bus-station/pos-bus-station.module';
import { PosAuthRescueModule } from './pos-auth/pos-auth-rescue/pos-auth-rescue.module';
import { PosAuthModule } from './pos-auth/pos-auth/pos-auth.module';
import { PosFileModule } from './pos-file/pos-file-main/pos-file.module';
import { PosGoodsCategoryModule } from './pos-goods/pos-good-category/pos-goods-category.module';
import { PosSeatTypeModule } from './pos-seat/pos-seat-type/pos-seat-type.module';
import { PosPaymentMethodModule } from './pos-payment-method/pos-payment-method.module';
import { PosSettingsModule } from './pos-settings/pos-settings.module';
import { PosReportModule } from './pos-report/pos-report.module';
import { PosGoodsModule } from './pos-goods/pos-goods/pos-goods.module';
import { PosTrackingModule } from './pos-tracking/pos-tracking.module';
import { PosTenantModule } from './pos-tenant/pos-tenant.module';

@Module({
  imports: [
    PosAuthModule,
    PosBusTypeModule,
    BusTypeModule,
    PosBusProvinceModule,
    PosBusStationModule,
    PosBusServiceModule,
    PosFileModule,
    PosBusRouteModule,
    PosBusScheduleModule,
    PosBusScheduleTemplateModule,
    PosBusScheduleLayoutModule,
    PosBusLayoutTemplateModule,
    PosUserModule,
    PosBusModule,
    PosBusTemplateModule,
    PosSeatTypeModule,
    PosBookingModule,
    PosPaymentModule,
    PosNotificationModule,
    PosBusScheduleAutogeneratorModule,
    PosDriverModule,
    PosGoodsModule,
    PosGoodsCategoryModule,
    PosPromotionModule,
    PosAuthRescueModule,
    PosPaymentMethodModule,
    PosSettingsModule,
    PosReportModule,
    PosTrackingModule,
    PosTenantModule,
  ],
  exports: [
    PosAuthModule,
    PosBusTypeModule,
    PosBusProvinceModule,
    PosBusStationModule,
    PosBusServiceModule,
    PosFileModule,
    PosBusRouteModule,
    PosBusScheduleModule,
    PosBusScheduleTemplateModule,
    PosBusScheduleLayoutModule,
    PosBusLayoutTemplateModule,
    PosUserModule,
    PosBusModule,
    PosBusTemplateModule,
    PosSeatTypeModule,
    PosBookingModule,
    PosPaymentModule,
    PosNotificationModule,
    PosBusScheduleAutogeneratorModule,
    PosDriverModule,
    PosGoodsModule,
    PosGoodsCategoryModule,
    PosPromotionModule,
    PosAuthRescueModule,
    PosPaymentMethodModule,
    PosSettingsModule,
    PosReportModule,
    PosTenantModule,
    PosTrackingModule,
  ],
})
export class PosModule {}
