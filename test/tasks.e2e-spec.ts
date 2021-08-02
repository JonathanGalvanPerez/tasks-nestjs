import * as supertest from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TasksModule } from '../src/tasks/tasks.module';
import { TasksService } from '../src/tasks/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../src/tasks/task.dto';

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
  description: 'new description',
};

let app: INestApplication;
let tasksService: TasksService;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [TasksModule],
    providers: [TasksService],
  }).compile();
  tasksService = module.get<TasksService>(TasksService);
  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  request = supertest(app.getHttpServer());
});

describe('Tasks e2e Testing', () => {
  beforeEach(() => {
    tasksService.clean();
  });

  it('/GET should response with an empty list', () => {
    return request.get('/tasks').expect(200, '[]');
  });

  it('/POST should store the task', async () => {
    await request.post('/tasks').send(task).expect(201).expect({
      message: 'Task has been created successfully',
      data: task,
    });
    expect(tasksService.findAll()).toEqual([task]);
    return;
  });

  it('/POST should store multiple tasks', async () => {
    await request.post('/tasks').send(task).expect(201);
    await request.post('/tasks').send(task2).expect(201);
    expect(tasksService.findAll()).toEqual([task, task2]);
  });

  it('/DELETE should remove the task', async () => {
    tasksService.create(task);
    tasksService.create(task2);
    await request
      .delete('/tasks/' + task.id)
      .expect(200)
      .expect({
        message: 'Task has been deleted successfully',
        data: task,
      });
    expect(tasksService.findAll()).toEqual([task2]);
    return;
  });

  it('/PUT should update the task', async () => {
    tasksService.create(task);
    tasksService.create(task2);
    const updatedTask = { ...task, ...taskUpdates };
    await request
      .put('/tasks/' + task.id)
      .send(taskUpdates)
      .expect(200)
      .expect({
        message: 'Task has been updated successfully',
        data: updatedTask,
      });
    expect(tasksService.findAll()).toEqual([updatedTask, task2]);
  });
});

describe('Tasks e2e Validations', () => {
  it('should response with error id is not a number', async () => {
    await request
      .post('/tasks')
      .send({
        ...task,
        id: 'id',
      })
      .expect(400)
      .then((res) => {
        const { message, error } = res.body;
        expect(error).toBe('Bad Request');
        expect(message).toEqual([
          'id must be a number conforming to the specified constraints',
        ]);
      });
  });
  it('should response with error id is empty', async () => {
    await request
      .post('/tasks')
      .send({
        title: 'A title',
        description: 'A description',
        completed: true,
        favorites: 1,
      })
      .expect(400)
      .then((res) => {
        const { message, error } = res.body;
        expect(error).toBe('Bad Request');
        expect(message).toEqual([
          'id should not be empty',
          'id must be a number conforming to the specified constraints',
        ]);
      });
  });
  it('should response with error title is not a string', async () => {
    await request
      .post('/tasks')
      .send({
        ...task,
        title: false,
      })
      .expect(400)
      .then((res) => {
        const { message, error } = res.body;
        expect(error).toBe('Bad Request');
        expect(message).toEqual(['title must be a string']);
      });
  });
  it('should response with error completed is not a boolean', async () => {
    await request
      .post('/tasks')
      .send({
        ...task,
        completed: 'true',
      })
      .expect(400)
      .then((res) => {
        const { message, error } = res.body;
        expect(error).toBe('Bad Request');
        expect(message).toEqual(['completed must be a boolean value']);
      });
  });
  it('should response with all error messages', async () => {
    await request
      .post('/tasks')
      .send({
        id: 0,
      })
      .expect(400)
      .then((res) => {
        const { message, error } = res.body;
        expect(error).toBe('Bad Request');
        expect(message).toHaveLength(8);
      });
  });
});

afterAll(async () => {
  await app.close();
});
