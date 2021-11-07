import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
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

xdescribe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(getRepositoryToken(Task))
      .useValue(mockTaskRepository)
      .overrideProvider(getRepositoryToken(TaskList))
      .useValue(mockListRepository)
      .compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllLists', () => {
    it('should return all lists', async () => {
      jest.spyOn(service, 'findAllLists').mockImplementation(async () => []);

      expect(await controller.findAllLists()).toEqual({ lists: [] });
    });
  });
});
