import { Test, TestingModule } from '@nestjs/testing';

import { GlobalController } from './global.controller';

describe('GlobalController', () => {
  let controller: GlobalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalController],
    }).compile();

    controller = module.get<GlobalController>(GlobalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GlobalController.healthCheck', () => {
    it('should respond successfully', async () => {
      const response = await controller.healthCheck();
      expect(response.success).toBeDefined();
      expect(response.success).toBe(true);
    });
  });
});
