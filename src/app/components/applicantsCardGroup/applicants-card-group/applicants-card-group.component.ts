import { Component, OnInit } from '@angular/core';
import { JobServiceService } from '../../../services/job-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ApplicantDetailsService } from '../../../services/applicant-details.service';

@Component({
  selector: 'app-applicants-card-group',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './applicants-card-group.component.html',
  styleUrls: ['./applicants-card-group.component.css'],
})
export class ApplicantsCardGroupComponent implements OnInit {
  appliedUsers: any[] = [];
  salary = 300;
  jobId: string | null = '';
  loading: boolean = true;
  page: number = 1;
  limit: number = 6;
  totalPages: number = 1;
  totalItems: number = 0;
  UserId: string | null = '';

  constructor(
    private jobService: JobServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _applicantDetailsService: ApplicantDetailsService 
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.jobId = paramMap.get('JobId');

      if (this.jobId) {
        this.fetchApplicants();
      }

      this.UserId = localStorage.getItem('userId');
    });
  }


  fetchApplicants() {
    this.loading = true;
    this.jobService.getJobById(this.jobId, this.page, this.limit).subscribe(
      (response) => {
        if (response && response.data) {
          this.appliedUsers = response.data;
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.limit);
          this.page = response.currentPage;

        } else {
          console.error('Invalid response format or no data returned');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching applied users:', error);
        this.loading = false;
      }
    );
  }

  get paginatedJobs() {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    return this.appliedUsers.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.fetchApplicants();
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  navigateToUserProfile(UserId: string) {

    window.location.href = `http://localhost:5173/profile/${UserId}`;
  }


  removeCard(index: number) {
    this.appliedUsers.splice(index, 1);
  }


  handleCandidateAction(userId: string, additionalFormSubmitted: boolean, decision: string, applicationId: string) {
    if (additionalFormSubmitted === true) {
      this.router.navigate(['/Company/applications', this.jobId, userId]);

    } else {

    this._applicantDetailsService.updateApplicantStutas({ applicationId, decision }).subscribe({
      next: (res) => {
        if (res) {
          decision === 'accepted' ?
            Swal.fire({
              title: 'Congratulations on Your New Hire!',
              html: `
              <img src="/congratsAcceptance.svg" alt="Congrats" style="width:80%; margin-bottom: 20px;" />
              <p>We are thrilled to welcome the newest member of your team. Wishing you great success and a prosperous future together!</p>
            `,
              showCloseButton: true,
              showConfirmButton: false,
              customClass: {
                popup: 'rounded-3'
              }
            }) :
            Swal.fire({
              title: 'Sorry',
              html: `
              <img src="/rejected.svg" alt="rejected" style="width:80%; margin-bottom: 20px;" />
              <p>We are thrilled to welcome the newest member of your team. Wishing you great success and a prosperous future together!</p>
            `,
              showCloseButton: true,
              showConfirmButton: false,
              customClass: {
                popup: 'rounded-3'
              }
            });
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  
    }

  }
}
