import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SetTodosDto } from 'src/Dtos/setTodos.dto';
import { ExpressRequest } from 'src/interfaces/expressRequest.interface';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getAllTodoLists(@Req() request: ExpressRequest): Promise<TodoEntity[]> {
    return await this.todoService.getAllTodoLists(request.user.id);
  }

  @Post()
  async setTodoList(
    @Body('todos') setTodosDto: SetTodosDto,
    @Req() request: ExpressRequest,
  ): Promise<TodoEntity> {
    return await this.todoService.setTodoList(setTodosDto, request.user);
  }

  @Delete(':id')
  async deleteTodoList(
    @Req() request: ExpressRequest,
    @Param('id') id: string,
  ): Promise<TodoEntity> {
    console.log(id, request.user.id, 'here');
    return await this.todoService.deleteTodoList(request.user.id, Number(id));
  }
}
