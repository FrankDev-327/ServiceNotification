import { Response } from 'express';
import * as client from 'prom-client';
import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusNotificationService } from './prometheus-notification.service';

@Controller('metrics')
export class PrometheusNotificationController {
    constructor(private readonly prometheusNotificationService: PrometheusNotificationService) { }

    @Get('/')
    async getMetrics(@Res() res: Response) {
        const metrics = await this.prometheusNotificationService.getMetrics();
        res.setHeader('Content-Type', client.register.contentType);
        res.send(metrics);
    }
}