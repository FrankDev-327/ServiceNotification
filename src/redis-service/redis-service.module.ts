import Redis from 'ioredis';
import { Module } from '@nestjs/common';
import { LoggerPrintService } from '../logger-print/logger-print.service';
import { RedisServiceService } from './redis-service.service';

@Module({
  imports: [],
  exports: [RedisServiceService],
  providers: [
    RedisServiceService,
    {
      provide: 'REDIS_SUBSCRIBER',
      useFactory: () => {
        const redis = new Redis({
          port: Number(process.env.REDIS_PORT) || 6379,
          host: process.env.REDIS_HOST,
        });
        const logger = new LoggerPrintService(RedisServiceService.name);

        redis.on('connect', () => {
          logger.log('🔌 Redis connecting...');
        });

        redis.on('ready', () => {
          logger.log('✅ Redis ready');
        });

        redis.on('error', (err) => {
          logger.error('❌ Redis error:', err.message);
        });

        return redis;
      },
    },
    {
      provide: LoggerPrintService,
      useValue: new LoggerPrintService(RedisServiceService.name),
    },
  ],
})
export class RedisServiceModule {}
