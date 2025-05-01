import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Jobs } from "../models/jobs";

@Injectable({
  providedIn: "root",
})
export class JobsApiService {
  constructor(private httpclient: HttpClient) {}

  getAllJobs(): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}jobs/get`);
  }
  getJobsByCompanyId(id: string): Observable<any> {
    return this.httpclient.get<any>(
      `${environment.baseUrl}/jobs/getJobsByCompanyId/${id}`
    );
  }
  getTheJobById(id: string): Observable<any> {
    return this.httpclient.get<any>(`${environment.baseUrl}/jobs/get/${id}`);
  }

  getJobsByCompanyName(companyName: string): Observable<any> {
    return this.httpclient.get<any>(
      `${environment.baseUrl}/jobs/getCompany?=${companyName}`
    );
  }
  getJobById(id: string): Observable<Jobs> {
    return this.httpclient.get<Jobs>(
      `${environment.baseUrl}/jobs/foundedJob/${id}`
    );
  }

  deleteJob(id: string | null): Observable<any> {
    return this.httpclient.delete<any>(
      `${environment.baseUrl}/jobs/delete/${id}`
    );
  }

  postJob(job: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.baseUrl}/jobs/create`, job);
  }

  updateJob(id: string, job: Jobs): Observable<any> {
    return this.httpclient.patch<any>(
      `${environment.baseUrl}/jobs/update/${id}`,
      job
    );
  }

  updateJobById(id: string, job: any): Observable<any> {
    return this.httpclient.patch<any>(
      `${environment.baseUrl}/jobs/update/${id}`,
      job
    );
  }
}
