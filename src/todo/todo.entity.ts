import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  todos: string[];

  //   @Column()
  //   userId: number;
}
