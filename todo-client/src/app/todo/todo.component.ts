import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  combineLatest,
  lastValueFrom,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { SnackBarService } from '../services/snack-bar.service';
import { TodoService } from './todo.service';
import { ITodoResponse } from './todos.types';

interface IUpdate {
  addList?: ITodoResponse;
  deleteList?: ITodoResponse;
  addItem?: { listId: number; value: string };
  deleteItem?: { listId: number; index: number };
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  private destroyed$: Subject<void> = new Subject();
  todos$: Observable<ITodoResponse[]>;
  update$: BehaviorSubject<IUpdate> = new BehaviorSubject<IUpdate>({});
  newItem: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private todoService: TodoService,
    private snackBarService: SnackBarService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    this.todos$ = combineLatest([this.getTodos(), this.update$]).pipe(
      map(([todos, update]) => {
        if (update.addItem) {
          todos = todos.map((todo) => {
            if (todo.id === update.addItem?.listId) {
              todo.todos.push(update.addItem.value);
            }
            return todo;
          });
        } else if (update.deleteItem) {
          todos = todos.map((todo) => {
            if (todo.id === update.deleteItem?.listId) {
              todo.todos.splice(update.deleteItem.index, 1);
            }
            return todo;
          });
        } else if (update.deleteList) {
          const rmvIndex = todos
            .map((todo) => {
              return todo.id;
            })
            .indexOf(update.deleteList.id);
          todos.splice(rmvIndex, 1);
        } else if (update.addList) {
          todos.push(update.addList);
        }
        return todos;
      })
    );
  }

  getTodos(): Observable<ITodoResponse[]> {
    return this.todoService.getTodos();
  }

  addNewItem(listId: number, value: string, todos: string[]) {
    this.todoService
      .updateTodos(listId, [...todos, value])
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.update$.next({ addItem: { listId, value } });
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
            this.update$.next({ deleteItem: { listId, index } });
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
            this.snackBarService.success('List added!');
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
            this.snackBarService.success('List deleted!');
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
