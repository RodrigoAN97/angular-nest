import { Controller, Get } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoService.getTodos();
  }
}
