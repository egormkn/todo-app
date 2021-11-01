import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';

@Controller('tasks')
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
  findOneTask(@Param('id') id: string) {
    return this.tasksService.findOneTask(+id);
  }

  @Put('task/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete('task/:id')
  removeTask(@Param('id') id: string) {
    return this.tasksService.removeTask(+id);
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
  findOneList(@Param('id') id: string) {
    return this.tasksService.findOneList(+id);
  }

  @Put('list/:id')
  updateList(@Param('id') id: string, @Body() updateTaskListDto: UpdateTaskListDto) {
    return this.tasksService.updateList(+id, updateTaskListDto);
  }

  @Delete('list/:id')
  removeList(@Param('id') id: string) {
    return this.tasksService.removeList(+id);
  }
}
