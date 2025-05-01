import { JobsApiService } from './jobs-api.service';
import { TestBed } from "@angular/core/testing";


describe("JobsApiService", () => {
  let service: JobsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
