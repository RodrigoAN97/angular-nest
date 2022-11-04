import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  newItem:BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private todoService: TodoService, private snackBarService: SnackBarService) {
    this.todos$ = this.getTodos();
  }

  getTodos(): Observable<ITodoResponse[]> {
    return this.todoService.getTodos();
  }

  addNew(lisId: number, value: string, todos: string[]) {
    this.todoService.updateTodos(lisId, [...todos, value]).subscribe({
      next: (res) => {
        // todos.push(value);
        console.log(res);
        this.newItem.next(false);
        this.snackBarService.success('New Item added!');
      },
      error: (err) => {
        console.log(err);
        this.snackBarService.error(err.error.message);
      },
    });
  }

  ngOnInit(): void {}
}
