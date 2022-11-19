import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../services/api.service';
import { ITodoResponse } from './todos.types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(
    private apiService: ApiService
  ) {}

  getTodos(): Observable<ITodoResponse[]> {
    return this.apiService.get('todos');
  }

  updateTodos(id: number, todos: string[]): Observable<ITodoResponse> {
    return this.apiService.put(`todos/${id}`, { todos: { todos } });
  }

  addNewList(): Observable<ITodoResponse> {
    return this.apiService.post('todos', { todos: { todos: [] } });
  }

  deleteList(id: number): Observable<ITodoResponse> {
    return this.apiService.delete(`todos/${id}`);
  }
}
