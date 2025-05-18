// src/app/services/property.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private http: HttpClient) {}

  getProperties(): Observable<any> {
    const headers: any = {
      token: `ahmedEhab ${localStorage.getItem('token')}`
    };
    return this.http.get<any>('https://gradution-project-silk.vercel.app/properties/my-properties', { headers });
  }

  getPropertyById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'token': `ahmedEhab ${token}`
    });
    return this.http.get<any>(`https://gradution-project-silk.vercel.app/properties/${id}`, { headers });
  }

  deleteProperty(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    token: `ahmedEhab ${token}`
  });
  return this.http.delete(`https://gradution-project-silk.vercel.app/properties/delete/${id}`, { headers });
}

}
