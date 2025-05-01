import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class JobServiceService {
  private apiUrl = environment.baseUrl;

  constructor(private _httpclient: HttpClient) {}

  getJobById(
    jobId: string | null,
    page: number = 1,
    limit: number = 6
  ): Observable<any> {
    if (!jobId) {
      throw new Error("jobId is required");
    }

    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());

    return this._httpclient.get<any>(`${this.apiUrl}/appliedJobs/${jobId}`, {
      params,
    });
  }
}
