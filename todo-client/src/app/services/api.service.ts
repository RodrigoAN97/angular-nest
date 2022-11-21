import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../auth/auth.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = 'http://localhost:3000/api/';
  user?: IUser;
  constructor(private httpClient: HttpClient) {}

  getUser() {
    const stored = localStorage.getItem('todo_user') as string;
    this.user = stored ? JSON.parse(stored) : {};
    return this.user;
  }

  setUser(user?: IUser) {
    if (!user) {
      localStorage.setItem('todo_user', '');
    } else {
      localStorage.setItem('todo_user', JSON.stringify(user));
    }
    this.user = user;
  }

  get(route: string, allowUnauthorized?: boolean): Observable<any> {
    return this.httpClient.get(`${this.endpoint}${route}`, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${this.user?.token}`,
      },
    });
  }

  post(
    route: string,
    payload: any,
    allowUnauthorized?: boolean
  ): Observable<any> {
    return this.httpClient.post(`${this.endpoint}${route}`, payload, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${this.user?.token}`,
      },
    });
  }

  put(
    route: string,
    payload: any,
    allowUnauthorized?: boolean
  ): Observable<any> {
    return this.httpClient.put(`${this.endpoint}${route}`, payload, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${this.user?.token}`,
      },
    });
  }

  delete(route: string, allowUnauthorized?: boolean): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}${route}`, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${this.user?.token}`,
      },
    });
  }
}
