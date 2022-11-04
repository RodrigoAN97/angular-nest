import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';
import { ITodoResponse } from './todos.types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos$: Observable<ITodoResponse[]>;
  constructor(private todoService: TodoService) {
    this.todos$ = this.getTodos();
  }

  getTodos(): Observable<ITodoResponse[]> {
    return this.todoService.getTodos();
  }

  ngOnInit(): void {}
}
