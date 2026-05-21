import { GetTodosQueryDto } from '../dto/get-todos-query.dto';
import { TodoResponseDto } from '../dto/todo-response.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoService } from '../services/todo.service';
import { TodoController } from './todo.controller';

type TodoServiceMock = {
  findAll: jest.Mock<ReturnType<TodoService['findAll']>, Parameters<TodoService['findAll']>>;
  findOne: jest.Mock<ReturnType<TodoService['findOne']>, Parameters<TodoService['findOne']>>;
  create: jest.Mock<ReturnType<TodoService['create']>, Parameters<TodoService['create']>>;
  update: jest.Mock<ReturnType<TodoService['update']>, Parameters<TodoService['update']>>;
  remove: jest.Mock<ReturnType<TodoService['remove']>, Parameters<TodoService['remove']>>;
};

const todoResponse: TodoResponseDto = {
  id: 'todo-id',
  title: 'Controller test',
  description: null,
  completed: false,
  createdAt: new Date('2026-05-01T10:00:00.000Z'),
  updatedAt: new Date('2026-05-01T10:00:00.000Z'),
};

describe('TodoController', () => {
  let service: TodoServiceMock;
  let controller: TodoController;

  beforeEach(() => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    controller = new TodoController(service as unknown as TodoService);
  });

  it('delegates list requests to the service', async () => {
    const query: GetTodosQueryDto = { completed: false };
    service.findAll.mockResolvedValue([todoResponse]);

    await expect(controller.findAll(query)).resolves.toEqual([todoResponse]);
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  // it('delegates single todo lookup to the service', async () => {
  //   service.findOne.mockResolvedValue(todoResponse);

  //   await expect(controller.findOne('todo-id')).resolves.toBe(todoResponse);
  //   expect(service.findOne).toHaveBeenCalledWith('todo-id');
  // });

  // it('delegates creation to the service', async () => {
  //   service.create.mockResolvedValue(todoResponse);

  //   await expect(controller.create({ title: 'Controller test' })).resolves.toBe(todoResponse);
  //   expect(service.create).toHaveBeenCalledWith({ title: 'Controller test' });
  // });

  // it('delegates updates to the service', async () => {
  //   const dto: UpdateTodoDto = { completed: true };
  //   service.update.mockResolvedValue({ ...todoResponse, completed: true });

  //   await expect(controller.update('todo-id', dto)).resolves.toEqual(
  //     expect.objectContaining({ completed: true }),
  //   );
  //   expect(service.update).toHaveBeenCalledWith('todo-id', dto);
  // });

  // it('delegates deletion to the service', async () => {
  //   service.remove.mockResolvedValue();

  //   await expect(controller.remove('todo-id')).resolves.toBeUndefined();
  //   expect(service.remove).toHaveBeenCalledWith('todo-id');
  // });
});
