import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertTodosDto } from '../Dtos/upsertTodos.dto';
import { UserEntity } from '../user/user.entity';

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
    // return this.getAllTodoLists(usxer.id);
  }

  async deleteTodoList(userId: number, listId: number): Promise<TodoEntity> {
    const list = await this.todoRepository.findOne({
      where: { user: { id: userId }, id: listId },
    });
    const oldList = { ...list };

    console.log(list, userId);
    if (!list) {
      throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    }

    await this.todoRepository.remove(list);
    return oldList;
    // return this.getAllTodoLists(userId);
  }

  async updateTodoList(
    userId: number,
    listId: number,
    upsertTodosDto: UpsertTodosDto,
  ): Promise<TodoEntity> {
    const list = await this.todoRepository.findOne({
      where: { user: { id: userId }, id: listId },
    });

    if (!list) {
      throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    }

    list.todos = upsertTodosDto.todos;
    await this.todoRepository
      .createQueryBuilder()
      .update(list)
      .where('id = :id', { id: listId })
      .execute();
    return list;
  }
}
