import { NotFoundException } from '@nestjs/common';
import { TodoEntity } from '../entities/todo.entity';
import { TodoRepository } from '../interfaces/todo-repository.interface';
import { TodoService } from './todo.service';

const makeTodo = (overrides: Partial<TodoEntity> = {}): TodoEntity => ({
  id: 'todo-id',
  title: 'Write tests',
  description: 'Cover service behavior',
  completed: false,
  createdAt: new Date('2026-05-01T10:00:00.000Z'),
  updatedAt: new Date('2026-05-01T10:00:00.000Z'),
  ...overrides,
});

describe('TodoService', () => {
  let repository: jest.Mocked<TodoRepository>;
  let service: TodoService;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new TodoService(repository);
  });

  it('returns all todos as response DTOs', async () => {
    const query = { completed: false };
    const todos = [
      makeTodo({ id: 'first-id' }),
      makeTodo({ id: 'second-id', completed: true }),
    ];
    repository.findAll.mockResolvedValue(todos);

    await expect(service.findAll(query)).resolves.toEqual([
      expect.objectContaining({ id: 'first-id', title: 'Write tests' }),
      expect.objectContaining({ id: 'second-id', completed: true }),
    ]);
    expect(repository.findAll).toHaveBeenCalledWith(query);
  });

  it('returns one todo when it exists', async () => {
    const todo = makeTodo({ id: 'existing-id' });
    repository.findById.mockResolvedValue(todo);

    await expect(service.findOne('existing-id')).resolves.toEqual(
      expect.objectContaining({ id: 'existing-id', title: todo.title }),
    );
  });

  it('throws when the requested todo does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toThrow(NotFoundException);
  });

  it('creates a todo through the repository', async () => {
    const created = makeTodo({ id: 'created-id', title: 'New todo' });
    repository.create.mockResolvedValue(created);

    await expect(service.create({ title: 'New todo' })).resolves.toEqual(
      expect.objectContaining({ id: 'created-id', title: 'New todo' }),
    );
    expect(repository.create).toHaveBeenCalledWith({ title: 'New todo' });
  });

  it('updates an existing todo', async () => {
    const existing = makeTodo({ completed: false });
    const updated = makeTodo({ completed: true });
    repository.findById.mockResolvedValue(existing);
    repository.update.mockResolvedValue(updated);

    await expect(service.update('todo-id', { completed: true })).resolves.toEqual(
      expect.objectContaining({ completed: true }),
    );
    expect(repository.update).toHaveBeenCalledWith(existing, { completed: true });
  });

  it('removes an existing todo', async () => {
    repository.findById.mockResolvedValue(makeTodo());
    repository.delete.mockResolvedValue();

    await expect(service.remove('todo-id')).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith('todo-id');
  });

  it('does not delete a missing todo', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.remove('missing-id')).rejects.toThrow(NotFoundException);
    expect(repository.delete).not.toHaveBeenCalled();
  });
  it('false test', async() => {
    expect(1==2);
  })
});