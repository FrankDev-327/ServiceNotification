import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';
import { notificationProcessingTimeGauge, deviceTokenCountGauge } from './prometheus-notification-exporter';

@Injectable()
export class PrometheusNotificationService {
    private readonly client: client.Registry;

    constructor() {
        this.client = new client.Registry();
        this.client.registerMetric(notificationProcessingTimeGauge);
        this.client.registerMetric(deviceTokenCountGauge);
        this.client.setDefaultLabels({ app: 'notificaction_service' });
        client.collectDefaultMetrics({
            register: this.client,
        });
    }

    async getMetrics(): Promise<string> {
        return await this.client.metrics();
    }
}
