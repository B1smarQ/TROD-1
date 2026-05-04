import { CreateTodoDto } from '../dto/create-todo.dto';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoEntity } from '../entities/todo.entity';

export const TODO_REPOSITORY = Symbol('TODO_REPOSITORY');

export interface TodoRepository {
  findAll(query: GetTodosQueryDto): Promise<TodoEntity[]>;
  findById(id: string): Promise<TodoEntity | null>;
  create(dto: CreateTodoDto): Promise<TodoEntity>;
  update(todo: TodoEntity, dto: UpdateTodoDto): Promise<TodoEntity>;
  delete(id: string): Promise<void>;
}
