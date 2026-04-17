import { Gauge } from 'prom-client';

export const notificationProcessingTimeGauge = new Gauge({
  name: 'notification_processing_time_seconds',
  help: 'Time taken to process a notification in seconds',
  labelNames: ['notification_type'],
});

export const numberCountFirebaseNotificationSent = new Gauge({
  name: 'notification_sent_fire_base',
  help: 'Number of notification sent by Firebase',
  labelNames: ['notificationType'],
});

export const deviceTokenCountGauge = new Gauge({
  name: 'device_token_count',
  help: 'Number of registered device tokens',
  labelNames: ['platform'],
});
