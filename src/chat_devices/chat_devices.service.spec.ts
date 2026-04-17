import { Test, TestingModule } from '@nestjs/testing';
import { ChatDevicesService } from './chat_devices.service';

describe('ChatDevicesService', () => {
  let service: ChatDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatDevicesService],
    }).compile();

    service = module.get<ChatDevicesService>(ChatDevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
