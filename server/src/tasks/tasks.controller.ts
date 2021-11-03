import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('tasks')
@Auth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('task')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('task')
  findAllTasks() {
    return this.tasksService.findAllTasks();
  }

  @Get('task/:id')
  findOneTask(@Param('id') id: number) {
    return this.tasksService.findOneTask(id);
  }

  @Patch('task/:id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('task/:id')
  removeTask(@Param('id') id: number) {
    return this.tasksService.removeTask(id);
  }

  @Post('list')
  createList(@Body() createTaskListDto: CreateTaskListDto) {
    return this.tasksService.createList(createTaskListDto);
  }

  @Get('list')
  findAllLists() {
    return this.tasksService.findAllLists();
  }

  @Get('list/:id')
  findOneList(@Param('id') id: number) {
    return this.tasksService.findOneList(id);
  }

  @Patch('list/:id')
  updateList(@Param('id') id: number, @Body() updateTaskListDto: UpdateTaskListDto) {
    return this.tasksService.updateList(id, updateTaskListDto);
  }

  @Delete('list/:id')
  removeList(@Param('id') id: number) {
    return this.tasksService.removeList(id);
  }
}
