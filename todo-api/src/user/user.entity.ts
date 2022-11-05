import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { TodoEntity } from '../todo/todo.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => TodoEntity, (todos) => todos.user)
  todos: TodoEntity[];
}
