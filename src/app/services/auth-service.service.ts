import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/companies/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/companies/signup`, userData);
  }

  isAuthenticated(): boolean {
    return !localStorage.getItem('token');
  }
}

 



  

