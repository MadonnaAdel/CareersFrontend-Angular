import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';
import { Observable } from 'rxjs';
import { AdditionalQuestions } from '../models/additional-questions';
import { IAppliedJob } from '../models/iapplied-job';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDetailsService {

  constructor(private httpClient: HttpClient) { }


  getAppliedUserById(id: string): Observable<Iuser> {
    return this.httpClient.get<Iuser>(`${environment.baseUrl}/users/${id}`);
  }
  getAdditionalQuestionsById(id: string): Observable<AdditionalQuestions> {
    return this.httpClient.get<AdditionalQuestions>(`${environment.baseUrl}/additionalQuestions/${id}`);
  }
  getAppliedJobById(jobId: string): Observable<IAppliedJob> {
    return this.httpClient.get<IAppliedJob>(`${environment.baseUrl}/appliedJobs/${jobId}`);
  }
  updateApplicantStutas({ applicationId, decision }: { applicationId: string; decision: string }): Observable<IAppliedJob> {
    return this.httpClient.put<IAppliedJob>(`${environment.baseUrl}/appliedJobs/update-status/`, { applicationId, decision });
  }
  
  getAnswerUser(jobId: string, userId: string): Observable<IAppliedJob> {
    return this.httpClient.get<IAppliedJob>(`${environment.baseUrl}/appliedJobs/get/${jobId}/${userId}`);
  }
}
