import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SetTodosDto } from 'src/Dtos/setTodos.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async getTodos(userId: number): Promise<TodoEntity[]> {
    return await this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async setTodos(
    setTodosDto: SetTodosDto,
    user: UserEntity,
  ): Promise<TodoEntity> {
    const todoList = new TodoEntity();
    Object.assign(todoList, setTodosDto);
    todoList.user = user;
    return await this.todoRepository.save(todoList);
  }
}
