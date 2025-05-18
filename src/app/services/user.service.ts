// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    const headers:any = {
    token: `ahmedEhab ${localStorage.getItem('token')}`
   } 

    return this.http.get<any>('https://gradution-project-silk.vercel.app/users/me', { headers });
  }
}
