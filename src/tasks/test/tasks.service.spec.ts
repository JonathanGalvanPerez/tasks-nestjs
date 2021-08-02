import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../task.dto';

describe('TasksService', () => {
  let service: TasksService;
  const task: CreateTaskDto = {
    id: 0,
    title: 'A title',
    description: 'A description',
    completed: false,
    favorites: 0,
  };
  const task2: CreateTaskDto = {
    id: 1,
    title: 'Another title',
    description: 'Another description',
    completed: false,
    favorites: 0,
  };
  const taskUpdates: UpdateTaskDto = {
    title: 'New title',
    description: 'New description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an empty array', () => {
    expect(service.findAll).toHaveLength(0);
  });
  it('should store the task', () => {
    expect(service.create).toBeDefined();
    expect(service.create(task)).toEqual(task);
    const result = service.findAll();
    expect(result).toHaveLength(1);
    expect(result).toEqual([task]);
  });
  it('should store multiple tasks', () => {
    expect(service.create).toBeDefined();
    expect(service.create(task)).toEqual(task);
    expect(service.create(task2)).toEqual(task2);
    const result = service.findAll();
    expect(result).toHaveLength(2);
    expect(result).toEqual([task, task2]);
  });
  it('should find element by id', () => {
    expect(service.findById).toBeDefined();
    service.create(task);
    service.create(task2);
    expect(service.findById(task.id)).toBe(task);
    expect(service.findById(task2.id)).toBe(task2);
    expect(service.findById(10)).toBeNull();
  });
  it('should remove the task from store', () => {
    expect(service.remove).toBeDefined();
    service.create(task);
    service.create(task2);
    expect(service.remove(task.id)).toEqual(task);
    const result = service.findAll();
    expect(result).toEqual([task2]);
  });
  it('should update a task', () => {
    expect(service.update).toBeDefined();
    service.create(task);
    service.create(task2);
    expect(service.update(task2.id, taskUpdates)).toEqual({
      ...task2,
      ...taskUpdates,
    });
    let result = service.findById(task2.id);
    expect(result).toHaveProperty('title', taskUpdates.title);
    expect(result).toHaveProperty('description', taskUpdates.description);
    result = service.findById(task.id);
    expect(result).toHaveProperty('title', task.title);
    expect(result).toHaveProperty('description', task.description);
  });
  it('should romove all the tasks', () => {
    service.create(task);
    service.create(task2);
    service.clean();
    expect(service.findAll()).toEqual([]);
  });
});
