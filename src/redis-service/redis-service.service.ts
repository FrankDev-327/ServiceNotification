import Redis from 'ioredis';
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { LoggerPrintService } from '../logger-print/logger-print.service';
import { FirebaseServiceService } from '../firebase-service/firebase-service.service';
import { notificationProcessingTimeGauge } from '../prometheus-notification/prometheus-notification-exporter';

@Injectable()
export class RedisServiceService implements OnModuleInit {
  constructor(
    @Inject('REDIS_SUBSCRIBER')
    private readonly redisSubscriber: Redis,
    private readonly logger: LoggerPrintService,
    private readonly firebaseServiceService: FirebaseServiceService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.initSubscriber();
  }

  private async initSubscriber(): Promise<void> {
    const channel = 'notification_channel';
    try {
      if (this.redisSubscriber.status !== 'ready') {
        this.logger.log('Waiting for Redis connection...');
        await new Promise<void>((resolve) => {
          this.redisSubscriber.once('ready', () => resolve());
        });
      }

      this.logger.log('Subscribing to channel...');
      const count = await this.redisSubscriber.subscribe(channel);
      this.logger.log(`✅ Subscribed successfully. Total channels: ${count}`);

      this.redisSubscriber.on('message', async (ch, msg) => {
        const message = JSON.parse(msg);
        notificationProcessingTimeGauge.inc({ notification_type: ch });
        await this.firebaseServiceService.sendNotification(
          ['d$upnw8wpvnoss8y6b2%op6b%5uc40maa'],
          message.messageType,
          message,
        );
        this.logger.log(`📩 Received message from ${ch}: `, message);
      });
    } catch (error) {
      notificationProcessingTimeGauge.dec({ notification_type: channel });
      this.logger.error('Subscription error:', error.message);
    }
  }
}
