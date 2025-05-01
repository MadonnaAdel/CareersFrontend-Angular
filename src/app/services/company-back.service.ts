import { Company } from './../models/company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyBackService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  signup(formData: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/companies/signup`, formData);
  }

  login(companyEmail: string, companyPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/companies/login`, { companyEmail, companyPassword })
      .pipe(
        tap(response => {
          if (response.token && response.company) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('companyInfo', JSON.stringify(response.company));
          }
        })
      );
  }

  sendMail(companyEmail: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/companies/sendMail`, { companyEmail }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  verifyOTP(email: string,otp:string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/companies/verifyOTP`, { email,otp }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  
    }
 restNewPass (email: string,newPassword:string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/companies/restNewPass`, { email,newPassword }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    const url = `${environment.baseUrl}/companies/resetPassword?token=${token}`;
    return this.httpClient.post(url, { newPassword, confirmPassword }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `An error occurred: ${error.message}`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
    return throwError(error);
  }
  

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('companyInfo');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCompanyInfo(): any {
    const companyInfo = localStorage.getItem('companyInfo');
    return companyInfo ? JSON.parse(companyInfo) : null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getCompanyById(companyId: string): Observable<any> {
  
    return this.httpClient.get<any>(`${environment.baseUrl}/companies/${companyId}`);
  
  }
  getJobsByCompanyName(companyName: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/jobs?companyName=${companyName}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
}

