import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UpsertTodosDto } from 'src/Dtos/upsertTodos.dto';
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
    @Body('todos') setTodosDto: UpsertTodosDto,
    @Req() request: ExpressRequest,
  ): Promise<TodoEntity> {
    return await this.todoService.setTodoList(setTodosDto, request.user);
  }

  @Delete(':id')
  async deleteTodoList(
    @Req() request: ExpressRequest,
    @Param('id') id: string,
  ): Promise<TodoEntity> {
    return await this.todoService.deleteTodoList(request.user.id, Number(id));
  }

  @Put(':id')
  async updateTodoList(
    @Req() request: ExpressRequest,
    @Param('id') id: string,
    @Body('todos') upsertTodosDto: UpsertTodosDto,
  ) {
    return await this.todoService.updateTodoList(
      request.user.id,
      Number(id),
      upsertTodosDto,
    );
  }
}
