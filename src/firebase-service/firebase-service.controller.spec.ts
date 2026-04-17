import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseServiceController } from './firebase-service.controller';

describe('FirebaseServiceController', () => {
  let controller: FirebaseServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirebaseServiceController],
    }).compile();

    controller = module.get<FirebaseServiceController>(FirebaseServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
