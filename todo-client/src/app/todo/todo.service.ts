import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ITodoResponse } from './todos.types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getTodos(): Observable<ITodoResponse[]> {
    console.log(this.authService.token);
    return this.httpClient.get<ITodoResponse[]>(
      `http://localhost:3000/api/todos`,
      {
        headers: { authorization: `token ${this.authService.token}` },
      }
    );
  }

  updateTodos(id: number, todos: string[]) {
    return this.httpClient.put(
      `http://localhost:3000/api/todos/${id}`,
      { todos: { todos } },
      {
        headers: { authorization: `token ${this.authService.token}` },
      }
    );
  }
}
