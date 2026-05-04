import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto';
import { TodoResponseDto } from '../dto/todo-response.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import {
  TODO_REPOSITORY,
  TodoRepository,
} from '../interfaces/todo-repository.interface';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}

  async findAll(query: GetTodosQueryDto): Promise<TodoResponseDto[]> {
    const todos = await this.todoRepository.findAll(query);
    return todos.map(TodoResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<TodoResponseDto> {
    const todo = await this.findEntityOrThrow(id);
    return TodoResponseDto.fromEntity(todo);
  }

  async create(dto: CreateTodoDto): Promise<TodoResponseDto> {
    const todo = await this.todoRepository.create(dto);
    return TodoResponseDto.fromEntity(todo);
  }

  async update(id: string, dto: UpdateTodoDto): Promise<TodoResponseDto> {
    const todo = await this.findEntityOrThrow(id);
    const updatedTodo = await this.todoRepository.update(todo, dto);
    return TodoResponseDto.fromEntity(updatedTodo);
  }

  async remove(id: string): Promise<void> {
    await this.findEntityOrThrow(id);
    await this.todoRepository.delete(id);
  }

  private async findEntityOrThrow(id: string) {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" was not found`);
    }

    return todo;
  }
}
