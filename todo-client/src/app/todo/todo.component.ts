import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  combineLatest,
  lastValueFrom,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
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
  update$: BehaviorSubject<{
    addList?: ITodoResponse;
    deleteList?: ITodoResponse;
  }> = new BehaviorSubject<{ addList?: ITodoResponse; deleteList?: ITodoResponse }>({});
  newItem: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private todoService: TodoService,
    private snackBarService: SnackBarService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    this.todos$ = combineLatest([this.getTodos(), this.update$]).pipe(
      map(([todos, update]) => {
        if (update.deleteList) {
          todos = todos.filter((todo) => todo.id !== update.deleteList?.id);
        }
        else if (update.addList) {
          todos.push(update.addList);
        }
        return todos;
      })
    );
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

  async deleteItem(listId: number, index: number, todos: string[]) {
    const item = todos[index];
    const confirm = await this.confirmDialog(
      `Do you want to delete this item (${item})?`
    );

    if (confirm) {
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
  }

  async addNewList() {
    const confirm = await this.confirmDialog('Do you want to add a new list?');
    if (confirm) {
      this.todoService
        .addNewList()
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (res) => {
            this.update$.next({ addList: res });
          },
          error: (err: HttpErrorResponse) => {
            this.snackBarService.error(err.error.message);
          },
        });
    }
  }

  async deleteList(id: number) {
    const confirm = await this.confirmDialog(
      'Do you want to delete this list?'
    );
    if (confirm) {
      this.todoService
        .deleteList(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (res) => {
            this.update$.next({ deleteList: res });
          },
          error: (err: HttpErrorResponse) => {
            this.snackBarService.error(err.error.message);
          },
        });
    }
  }

  confirmDialog(message: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      disableClose: true,
      data: { title: 'Are you sure?', message },
    });

    return lastValueFrom(dialogRef.afterClosed());
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
