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

  updateTodos(id: number, todos: string[]): Observable<ITodoResponse> {
    return this.httpClient.put<ITodoResponse>(
      `http://localhost:3000/api/todos/${id}`,
      { todos: { todos } },
      {
        headers: { authorization: `token ${this.authService.token}` },
      }
    );
  }

  addNewList(): Observable<ITodoResponse[]> {
    return this.httpClient.post<ITodoResponse[]>(
      `http://localhost:3000/api/todos`,
      { todos: { todos: [] } },
      {
        headers: { authorization: `token ${this.authService.token}` },
      }
    );
  }

  deleteList(id: number): Observable<ITodoResponse[]> {
    return this.httpClient.delete<ITodoResponse[]>(
      `http://localhost:3000/api/todos/${id}`,
      {
        headers: { authorization: `token ${this.authService.token}` },
      }
    );
  }
}
