import { Test, TestingModule } from '@nestjs/testing';
import { createMockObj } from '../common/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const mockedTasksService = createMockObj<TasksService>(['findAllLists']);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockedTasksService }],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get(TasksService) as jest.Mocked<TasksService>;
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
    expect(tasksService).toBeDefined();
  });
});
