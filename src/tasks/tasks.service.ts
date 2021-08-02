import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const result = this.tasks.filter((task) => task.id === id);
    return result.length === 0 ? null : result[0];
  }

  create(task: CreateTaskDto) {
    this.tasks.push(task);
    return task as Task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    const deleted = this.tasks.splice(index, 1);
    return deleted.length === 0 ? null : deleted[0];
  }

  update(id: number, updates: UpdateTaskDto) {
    const index = this.tasks.findIndex((task) => task.id === id);
    const updatedTask = { ...this.tasks[index], ...updates };
    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  clean() {
    this.tasks.splice(0);
  }
}
