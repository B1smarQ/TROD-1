import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoEntity } from '../entities/todo.entity';
import { TodoRepository } from '../interfaces/todo-repository.interface';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repository: Repository<TodoEntity>,
  ) {}

  findAll(query: GetTodosQueryDto): Promise<TodoEntity[]> {
    const where: FindOptionsWhere<TodoEntity> = {};

    if (query.completed !== undefined) {
      where.completed = query.completed;
    }

    return this.repository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findById(id: string): Promise<TodoEntity | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  create(dto: CreateTodoDto): Promise<TodoEntity> {
    const todo = this.repository.create({
      title: dto.title,
      description: dto.description,
      completed: dto.completed ?? false,
    });

    return this.repository.save(todo);
  }

  update(todo: TodoEntity, dto: UpdateTodoDto): Promise<TodoEntity> {
    const updatedTodo = this.repository.merge(todo, dto);
    return this.repository.save(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
