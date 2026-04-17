import { Test, TestingModule } from '@nestjs/testing';
import { ChatDevicesController } from './chat_devices.controller';

describe('ChatDevicesController', () => {
  let controller: ChatDevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatDevicesController],
    }).compile();

    controller = module.get<ChatDevicesController>(ChatDevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
