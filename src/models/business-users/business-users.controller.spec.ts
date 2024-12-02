import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUsersController } from './business-users.controller';
import { BusinessUsersService } from './business-users.service';

describe('BusinessUsersController', () => {
  let controller: BusinessUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessUsersController],
      providers: [BusinessUsersService],
    }).compile();

    controller = module.get<BusinessUsersController>(BusinessUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
