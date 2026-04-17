import { Module } from '@nestjs/common';
import { dbdatasource } from '../orm';
import { ConfigModule } from '@nestjs/config';
import { RedisServiceModule } from './redis-service/redis-service.module';
import { LoggerPrintModule } from './logger-print/logger-print.module';
import { ChatDevicesModule } from './chat_devices/chat_devices.module';
import { PrometheusNotificationModule } from './prometheus-notification/prometheus-notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbdatasource),
    RedisServiceModule,
    PrometheusNotificationModule,
    LoggerPrintModule,
    ChatDevicesModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
