import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockObj } from '../common/testing';
import { Repository } from 'typeorm';
import { TaskList } from './entities/task-list.entity';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: jest.Mocked<Repository<Task>>;
  let listsRepository: jest.Mocked<Repository<TaskList>>;

  beforeEach(async () => {
    const tasksRepositoryToken = getRepositoryToken(Task);
    const listsRepositoryToken = getRepositoryToken(TaskList);
    const mockedTasksRepository = createMockObj<Repository<Task>>(['findOne', 'create']);
    const mockedListsRepository = createMockObj<Repository<TaskList>>(['findOne', 'create']);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: tasksRepositoryToken, useValue: mockedTasksRepository },
        { provide: listsRepositoryToken, useValue: mockedListsRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get(tasksRepositoryToken) as jest.Mocked<Repository<Task>>;
    listsRepository = module.get(listsRepositoryToken) as jest.Mocked<Repository<TaskList>>;
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
    expect(tasksRepository).toBeDefined();
    expect(listsRepository).toBeDefined();
  });
});
