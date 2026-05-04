import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { GetTodosQueryDto } from '../dto/get-todos-query.dto';
import { TodoResponseDto } from '../dto/todo-response.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Query() query: GetTodosQueryDto): Promise<TodoResponseDto[]> {
    return this.todoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TodoResponseDto> {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTodoDto): Promise<TodoResponseDto> {
    return this.todoService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto): Promise<TodoResponseDto> {
    return this.todoService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(id);
  }
}
