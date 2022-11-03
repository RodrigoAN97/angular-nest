import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SetTodosDto } from 'src/Dtos/setTodos.dto';
import { ExpressRequest } from 'src/interfaces/expressRequest.interface';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoService.getTodos();
  }

  @Post()
  async setTodos(
    @Body('todos') setTodosDto: SetTodosDto,
    @Req() request: ExpressRequest,
  ): Promise<TodoEntity> {
    return await this.todoService.setTodos(setTodosDto, request.user);
  }
}
