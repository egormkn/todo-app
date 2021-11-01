import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskList } from './entities/task-list.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private readonly listRepository: Repository<TaskList>,
  ) {}

  public async createTask(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.isDone = false;
    const list = await this.listRepository.findOneOrFail(createTaskDto.list, {
      relations: ['tasks'],
    });
    list.tasks.push(task);
    return this.listRepository.save(list);
  }

  public async findAllTasks() {
    return this.taskRepository.find();
  }

  public async findOneTask(id: number) {
    return this.taskRepository.findOne(id);
  }

  public async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, {
      title: updateTaskDto.title,
      description: updateTaskDto.description,
      isDone: updateTaskDto.isDone,
    });
  }

  public async removeTask(id: number) {
    return this.taskRepository.delete(id);
  }

  public async createList(createTaskListDto: CreateTaskListDto) {
    const list = new TaskList();
    list.title = createTaskListDto.title;
    list.tasks = [];
    return this.listRepository.save(list);
  }

  public async findAllLists() {
    const lists = await this.listRepository.find({ relations: ['tasks'] });
    lists.forEach((list) => {
      list.tasks.sort((a, b) => a.id - b.id);
    });
    return lists;
  }

  public async findOneList(id: number) {
    return this.listRepository.findOne(id, { relations: ['tasks'] });
  }

  public async updateList(id: number, updateTaskListDto: UpdateTaskListDto) {
    return this.listRepository.update(id, { title: updateTaskListDto.title });
  }

  public async removeList(id: number) {
    return this.listRepository.delete(id);
  }
}
