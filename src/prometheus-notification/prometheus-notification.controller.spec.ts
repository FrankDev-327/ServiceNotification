import { Test, TestingModule } from '@nestjs/testing';
import { PrometheusNotificationController } from './prometheus-notification.controller';

describe('PrometheusNotificationController', () => {
  let controller: PrometheusNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrometheusNotificationController],
    }).compile();

    controller = module.get<PrometheusNotificationController>(PrometheusNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
