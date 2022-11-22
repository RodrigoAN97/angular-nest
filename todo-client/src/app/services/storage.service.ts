import { Injectable } from '@angular/core';
import { IUser } from '../auth/auth.types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUser(user?: IUser) {
    if (!user) {
      localStorage.setItem('todo_user', '');
    } else {
      localStorage.setItem('todo_user', JSON.stringify(user));
    }
  }

  get user() {
    const stored = localStorage.getItem('todo_user') as string;
    return stored ? JSON.parse(stored) : {};
  }
}
