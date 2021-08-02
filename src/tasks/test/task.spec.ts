import { Task } from '../task';

const task: Task = {
  id: 1,
  title: 'A title',
  description: 'A description',
  completed: false,
  favorites: 0,
};

describe('Task', () => {
  it('should be defined', () => {
    expect(new Task()).toBeDefined();
  });
  it('should be able to be instantiated', () => {
    const task = new Task();
    expect(task).toBeInstanceOf(Task);
  });
  it('should have id property', () => {
    expect(task).toHaveProperty('id', 1);
  });
  it('should have title property', () => {
    expect(task).toHaveProperty('title', 'A title');
  });
  it('should have description property', () => {
    expect(task).toHaveProperty('description', 'A description');
  });
  it('should have completed property', () => {
    expect(task).toHaveProperty('completed', false);
  });
  it('should have favorites property', () => {
    expect(task).toHaveProperty('favorites', 0);
  });
});
