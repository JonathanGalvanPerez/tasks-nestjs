import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.findAll();
  }
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.tasksService.findById(id);
  }
  @Post()
  create(@Body() data: CreateTaskDto) {
    return {
      message: 'Task has been created successfully',
      data: this.tasksService.create(data),
    };
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Task has been deleted successfully',
      data: this.tasksService.remove(id),
    };
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto) {
    return {
      message: 'Task has been updated successfully',
      data: this.tasksService.update(id, data),
    };
  }
}
