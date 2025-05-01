import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../../services/jobs-api.service'
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterLink],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  showIcons: boolean = false;
  jobs: any[] = [];
  currentPage = 1;
  jobsPerPage = 3;
  totalJobs = 0;
  totalPages: number[] = [];
  company:any
  constructor(private _jobsApiService:JobsApiService) {}

  ngOnInit(): void {
    const companyInfo = localStorage.getItem('companyInfo');
    
    if (companyInfo) {
      this.company = JSON.parse(companyInfo);
      this._jobsApiService.getJobsByCompanyId(this.company.id).subscribe({
        next: (res) => {
          this.jobs = res.jobs;
          this.totalJobs = this.jobs.length;
          this.calculateTotalPages();
        },
      });
    }
  }

  deleteJob(id: string) {
    this._jobsApiService.deleteJob(id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Job Deleted',
          text: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        
        this.jobs = this.jobs.filter(job => job._id !== id);
        this.totalJobs = this.jobs.length;
        this.calculateTotalPages();
        if (this.currentPage > this.totalPages.length) {
          this.currentPage = this.totalPages.length;
        }
      }
    });
  }

  toggleIcons() {
    this.showIcons = !this.showIcons;
  }

  calculateTotalPages() {
    this.totalPages = Array(Math.ceil(this.totalJobs / this.jobsPerPage)).fill(0).map((_, i) => i + 1);
  }

  get paginatedJobs() {
    const start = (this.currentPage - 1) * this.jobsPerPage;
    const end = start + this.jobsPerPage;
    return this.jobs.slice(start, end);
  }

  changePage(event: Event, page: number) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
    }
  }
}
