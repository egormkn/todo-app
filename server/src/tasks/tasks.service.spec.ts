import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

const mockList = new TaskList();

export const mockListRepository = {
  find: async () => [mockList],
  findOne: async () => mockList,
  save: async () => mockList,
};

const mockTask = new Task();

export const mockTaskRepository = {
  find: async () => [mockTask],
  findOne: async () => mockTask,
  save: async () => mockTask,
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    })
      .overrideProvider(getRepositoryToken(Task))
      .useValue(mockTaskRepository)
      .overrideProvider(getRepositoryToken(TaskList))
      .useValue(mockListRepository)
      .compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
