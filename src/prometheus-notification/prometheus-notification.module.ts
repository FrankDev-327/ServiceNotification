import { Module } from '@nestjs/common';
import { LoggerPrintService } from '../logger-print/logger-print.service';
import { PrometheusNotificationService } from './prometheus-notification.service';
import { PrometheusNotificationController } from './prometheus-notification.controller';

@Module({
  controllers: [PrometheusNotificationController],
  providers: [PrometheusNotificationService, {
    provide: LoggerPrintService,
    useValue: new LoggerPrintService(PrometheusNotificationService.name),
  }],
  exports: [PrometheusNotificationService],
})
export class PrometheusNotificationModule { }
