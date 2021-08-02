import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../task.dto';

/* const tasksService = {
  findAll: () => ['task'],
  findById: () => 'task',
  create: () => 'task',
  remove: () => 'task',
  update: () => 'task',
}; */
const task: CreateTaskDto = {
  id: 0,
  title: 'A title',
  description: 'A description',
  completed: false,
  favorites: 0,
};
const taskUpdates: UpdateTaskDto = {
  title: 'Another title',
  description: 'Another description',
};
const tasks = [task, task, task];

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });
  it('should call the funtion "find"', () => {
    const spy = jest
      .spyOn(tasksService, 'findAll')
      .mockImplementation(() => tasks);
    tasksController.getTasks();
    expect(spy).toBeCalled();
  });
  it('should call the funtion "findById"', () => {
    const spy = jest
      .spyOn(tasksService, 'findById')
      .mockImplementation(() => task);
    tasksController.getById(task.id);
    expect(spy).toBeCalledWith(task.id);
  });
  it('should call the funtion "post"', () => {
    const spy = jest
      .spyOn(tasksService, 'create')
      .mockImplementation(() => task);
    tasksController.create(task);
    expect(spy).toBeCalledWith(task);
  });
  it('should call the funtion "remove"', () => {
    const spy = jest
      .spyOn(tasksService, 'remove')
      .mockImplementation(() => task);
    tasksController.remove(task.id);
    expect(spy).toBeCalledWith(task.id);
  });
  it('should call the funtion "update"', () => {
    const spy = jest
      .spyOn(tasksService, 'update')
      .mockImplementation(() => task);
    tasksController.update(task.id, taskUpdates);
    expect(spy).toBeCalledWith(task.id, taskUpdates);
  });
});
