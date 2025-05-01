import { Component, OnInit } from "@angular/core";
import { ApplicantDetailsService } from "../../services/applicant-details.service";
import { ActivatedRoute } from "@angular/router";
import { Iuser } from "../../models/iuser";
import { CommonModule } from "@angular/common";
import { AdditionalQuestions } from "../../models/additional-questions";
import { IAppliedJob } from "../../models/iapplied-job";
import { JobServiceService } from "../../services/job-service.service";
import { Jobs } from "../../models/jobs";
import Swal from "sweetalert2";

@Component({
  selector: "app-applicants",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./applicants.component.html",
  styleUrl: "./applicants.component.css",
})
export class ApplicantsComponent implements OnInit {
  jobId: string | any = "";
  userId: string | any = "";
  job: Jobs = {} as Jobs;
  jobSeeker: Iuser | null = null;
  qusetions: AdditionalQuestions = {} as AdditionalQuestions;
  applicantAnswers: IAppliedJob = {} as IAppliedJob;
  constructor(
    private _applicantDetailsService: ApplicantDetailsService,
    private _activedRoute: ActivatedRoute,
    private _jobService: JobServiceService
  ) {}
  ngOnInit(): void {
    this._activedRoute.paramMap.subscribe((paramMap) => {
      this.jobId = paramMap.get("JobId");
      this.userId = paramMap.get("UserId");
    });

    this._applicantDetailsService
      .getAdditionalQuestionsById(this.jobId)
      .subscribe({
        next: (res) => {
          this.qusetions = res;
        },
        error: (err) => {
          console.error(err);
        },
      });

    this._applicantDetailsService.getAppliedUserById(this.userId).subscribe({
      next: (res) => {
        this.jobSeeker = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._applicantDetailsService
      .getAnswerUser(this.jobId, this.userId)
      .subscribe({
        next: (res) => {
          this.applicantAnswers = res;
        },
        error: (err) => {
          console.error(err);
        },
      });

    this._jobService.getJobById(this.jobId).subscribe({
      next: (res) => {
        this.job = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateApplicantStatus(decision: string, applicationId: string) {
    this._applicantDetailsService
      .updateApplicantStutas({ applicationId, decision })
      .subscribe({
        next: (res) => {
          if (res) {
            decision === "accepted"
              ? Swal.fire({
                  title: "Congratulations on Your New Hire!",
                  html: `
              <img src="/congratsAcceptance.svg" alt="Congrats" style="width:80%; margin-bottom: 20px;" />
              <p>We are thrilled to welcome the newest member of your team. Wishing you great success and a prosperous future together!</p>
            `,
                  showCloseButton: true,
                  showConfirmButton: false,
                  customClass: {
                    popup: "rounded-3",
                  },
                })
              : Swal.fire({
                  title: "Sorry",
                  html: `
                            <img src="/rejected.svg" alt="rejected" style="width:80%; margin-bottom: 20px;" />

              <p>We are thrilled to welcome the newest member of your team. Wishing you great success and a prosperous future together!</p>
            `,
                  showCloseButton: true,
                  showConfirmButton: false,
                  customClass: {
                    popup: "rounded-3",
                  },
                });
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  navigateToCandidates() {
    window.location.href = `https://react-app-nine-beryl.vercel.app/profile/${this.userId}`;
  }
}
