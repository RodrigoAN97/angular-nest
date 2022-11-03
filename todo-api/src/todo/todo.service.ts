import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertTodosDto } from 'src/Dtos/upsertTodos.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async getAllTodoLists(userId: number): Promise<TodoEntity[]> {
    return await this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async setTodoList(
    setTodosDto: UpsertTodosDto,
    user: UserEntity,
  ): Promise<TodoEntity> {
    const todoList = new TodoEntity();
    Object.assign(todoList, setTodosDto);
    todoList.user = user;
    return await this.todoRepository.save(todoList);
  }

  async deleteTodoList(userId: number, listId: number): Promise<TodoEntity> {
    const list = await this.todoRepository.findOne({
      where: { user: { id: userId }, id: listId },
    });

    console.log(list, userId);
    if (!list) {
      throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    }

    return await this.todoRepository.remove(list);
  }

  async updateTodoList(
    userId: number,
    listId: number,
    upsertTodosDto: UpsertTodosDto,
  ): Promise<UpdateResult> {
    const list = await this.todoRepository.findOne({
      where: { user: { id: userId }, id: listId },
    });

    if (!list) {
      throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    }

    list.todos = upsertTodosDto.todos;
    return await this.todoRepository
      .createQueryBuilder()
      .update(list)
      .where('id = :id', { id: listId })
      .execute();
  }
}
