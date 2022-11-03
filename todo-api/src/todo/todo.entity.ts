import { UserEntity } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  todos: string[];

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity;
}
