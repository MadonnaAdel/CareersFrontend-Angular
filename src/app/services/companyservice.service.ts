import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {

  constructor(private _httpClient: HttpClient) {}

  getCompanyDetails(id: string | null): Observable<any> {
    return this._httpClient.get<any>(`${environment.baseUrl}/companies/${id}`);
  }
}
