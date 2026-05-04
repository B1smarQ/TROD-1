import { TodoEntity } from '../entities/todo.entity';

export class TodoResponseDto {
  id!: string;
  title!: string;
  description?: string | null;
  completed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static fromEntity(entity: TodoEntity): TodoResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      completed: entity.completed,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
