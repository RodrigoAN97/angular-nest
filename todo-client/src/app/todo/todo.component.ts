import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { TodoService } from './todo.service';
import { ITodoResponse } from './todos.types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private destroyed$: Subject<void> = new Subject();
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
    this.todoService
      .updateTodos(listId, [...todos, value])
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          console.log(res);
          todos.push(value);
          this.newItem.next(false);
          this.snackBarService.success('New item added!');
        },
        error: (err: HttpErrorResponse) => {
          this.snackBarService.error(err.error.message);
        },
      });
  }

  deleteItem(listId: number, index: number, todos: string[]) {
    const item = todos[index];

    this.todoService
      .updateTodos(
        listId,
        todos.filter((_, i) => i !== index)
      )
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          console.log(res);
          todos.splice(index, 1);
          this.newItem.next(false);
          this.snackBarService.success(`${item} removed!`);
        },
        error: (err: HttpErrorResponse) => {
          this.snackBarService.error(err.error.message);
        },
      });
  }

  addNewList() {
    const newList = this.todoService.addNewList();

    this.todos$ = combineLatest([this.todos$, newList]).pipe(
      map(([todos, newList]) => [...todos, newList])
    );
  }

  deleteList(id: number) {
    this.todos$ = this.todoService.deleteList(id);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
