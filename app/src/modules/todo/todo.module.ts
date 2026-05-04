import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { TodoEntity } from './entities/todo.entity';
import { TODO_REPOSITORY } from './interfaces/todo-repository.interface';
import { TypeOrmTodoRepository } from './repositories/typeorm-todo.repository';
import { TodoService } from './services/todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: TODO_REPOSITORY,
      useClass: TypeOrmTodoRepository,
    },
  ],
})
export class TodoModule {}
