import { Test, TestingModule } from '@nestjs/testing';
import { PrometheusNotificationService } from './prometheus-notification.service';

describe('PrometheusNotificationService', () => {
  let service: PrometheusNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrometheusNotificationService],
    }).compile();

    service = module.get<PrometheusNotificationService>(PrometheusNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
