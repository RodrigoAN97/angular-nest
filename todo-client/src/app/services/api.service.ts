import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../auth/auth.types';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = 'http://localhost:3000/api/';
  constructor(private httpClient: HttpClient, private storageService: StorageService) {}

  get(route: string, allowUnauthorized?: boolean): Observable<any> {
    const user = this.storageService.getUser();
    return this.httpClient.get(`${this.endpoint}${route}`, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${user.token}`,
      },
    });
  }

  post(
    route: string,
    payload: any,
    allowUnauthorized?: boolean
  ): Observable<any> {
    const user = this.storageService.getUser();
    return this.httpClient.post(`${this.endpoint}${route}`, payload, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${user.token}`,
      },
    });
  }

  put(
    route: string,
    payload: any,
    allowUnauthorized?: boolean
  ): Observable<any> {
    const user = this.storageService.getUser();
    return this.httpClient.put(`${this.endpoint}${route}`, payload, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${user.token}`,
      },
    });
  }

  delete(route: string, allowUnauthorized?: boolean): Observable<any> {
    const user = this.storageService.getUser();
    return this.httpClient.delete(`${this.endpoint}${route}`, {
      headers: {
        authorization: allowUnauthorized ? '' : `token ${user.token}`,
      },
    });
  }
}
