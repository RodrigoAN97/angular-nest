import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { TodoService } from './todo.service';
import { ITodoResponse } from './todos.types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos$: Observable<ITodoResponse[]>;
  newItem: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private todoService: TodoService,
    private snackBarService: SnackBarService
  ) {
    this.todos$ = this.getTodos();
  }

  getTodos(): Observable<ITodoResponse[]> {
    return this.todoService.getTodos();
  }

  addNew(listId: number, value: string, todos: string[]) {
    const updated$ = this.todoService.updateTodos(listId, [...todos, value]);
    this.todos$ = combineLatest([this.todos$, updated$]).pipe(
      map(([todos, updated]) => {
        return todos.map((list) => {
          if (list.id === updated.id) {
            return updated;
          }
          return list;
        });
      })
    );
  }

  ngOnInit(): void {}
}
