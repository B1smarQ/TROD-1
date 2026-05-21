import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { TypeOrmTodoRepository } from './typeorm-todo.repository';

type RepositoryMock = {
  find: jest.Mock<Promise<TodoEntity[]>, [FindManyOptions<TodoEntity>]>;
  findOne: jest.Mock<Promise<TodoEntity | null>, [FindOneOptions<TodoEntity>]>;
  create: jest.Mock<TodoEntity, [Partial<TodoEntity>]>;
  save: jest.Mock<Promise<TodoEntity>, [TodoEntity]>;
  merge: jest.Mock<TodoEntity, [TodoEntity, Partial<TodoEntity>]>;
  delete: jest.Mock<Promise<DeleteResult>, [string]>;
};

const makeTodo = (overrides: Partial<TodoEntity> = {}): TodoEntity => ({
  id: 'todo-id',
  title: 'Persisted todo',
  description: null,
  completed: false,
  createdAt: new Date('2026-05-01T10:00:00.000Z'),
  updatedAt: new Date('2026-05-01T10:00:00.000Z'),
  ...overrides,
});

describe('TypeOrmTodoRepository', () => {
  let repository: RepositoryMock;
  let todoRepository: TypeOrmTodoRepository;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
    };
    todoRepository = new TypeOrmTodoRepository(repository as unknown as Repository<TodoEntity>);
  });

  it('finds all todos ordered by newest first', async () => {
    const todos = [makeTodo()];
    repository.find.mockResolvedValue(todos);

    await expect(todoRepository.findAll({})).resolves.toBe(todos);
    expect(repository.find).toHaveBeenCalledWith({
      where: {},
      order: {
        createdAt: 'DESC',
      },
    });
  });

  // it('filters todos by completion status', async () => {
  //   repository.find.mockResolvedValue([]);

  //   await todoRepository.findAll({ completed: true });
  //   expect(repository.find).toHaveBeenCalledWith({
  //     where: { completed: true },
  //     order: {
  //       createdAt: 'DESC',
  //     },
  //   });
  // });

  // it('finds a todo by id', async () => {
  //   const todo = makeTodo({ id: 'lookup-id' });
  //   repository.findOne.mockResolvedValue(todo);

  //   await expect(todoRepository.findById('lookup-id')).resolves.toBe(todo);
  //   expect(repository.findOne).toHaveBeenCalledWith({
  //     where: {
  //       id: 'lookup-id',
  //     },
  //   });
  // });

  // it('creates todos with completed defaulting to false', async () => {
  //   const created = makeTodo({ title: 'New todo' });
  //   repository.create.mockReturnValue(created);
  //   repository.save.mockResolvedValue(created);

  //   await expect(todoRepository.create({ title: 'New todo' })).resolves.toBe(created);
  //   expect(repository.create).toHaveBeenCalledWith({
  //     title: 'New todo',
  //     description: undefined,
  //     completed: false,
  //   });
  //   expect(repository.save).toHaveBeenCalledWith(created);
  // });

  // it('keeps the provided completed value when creating todos', async () => {
  //   const created = makeTodo({ completed: true });
  //   repository.create.mockReturnValue(created);
  //   repository.save.mockResolvedValue(created);

  //   await todoRepository.create({ title: 'Done todo', completed: true });
  //   expect(repository.create).toHaveBeenCalledWith({
  //     title: 'Done todo',
  //     description: undefined,
  //     completed: true,
  //   });
  // });

  // it('updates todos by merging and saving', async () => {
  //   const existing = makeTodo({ completed: false });
  //   const updated = makeTodo({ completed: true });
  //   repository.merge.mockReturnValue(updated);
  //   repository.save.mockResolvedValue(updated);

  //   await expect(todoRepository.update(existing, { completed: true })).resolves.toBe(updated);
  //   expect(repository.merge).toHaveBeenCalledWith(existing, { completed: true });
  //   expect(repository.save).toHaveBeenCalledWith(updated);
  // });

  // it('deletes todos by id', async () => {
  //   repository.delete.mockResolvedValue({ affected: 1, raw: [] });

  //   await expect(todoRepository.delete('todo-id')).resolves.toBeUndefined();
  //   expect(repository.delete).toHaveBeenCalledWith('todo-id');
  // });
});
