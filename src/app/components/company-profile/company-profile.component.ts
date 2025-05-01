import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompanyBackService } from '../../services/company-back.service';
import { Company } from '../../models/company';
import { JobsApiService } from '../../services/jobs-api.service';
import { DateTimePipe } from '../../../pipe/pipes/date-time.pipe';

@Component({
  selector: 'company-profile',
  standalone: true,
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
  imports: [CommonModule, HttpClientModule,DateTimePipe]
})
export class CompanyProfileComponent implements OnInit {
  selectedCompany?: Company;
  jobs: any[] = []; 

  constructor(private companyService: CompanyBackService,private _jobsApiService:JobsApiService) {}

  ngOnInit(): void {
    this.loadCompanyProfile().then(() => {
      this.loadJobs();  
    }).catch((error) => {
      console.error('Error loading company profile:', error);
    });
  }

  async loadCompanyProfile(): Promise<void> {
    const companyInfo = localStorage.getItem('companyInfo');
    if (companyInfo) {
      const companyData = JSON.parse(companyInfo);
      const companyId = companyData.id;

      try {
        const response = await this.companyService.getCompanyById(companyId).toPromise();
        if (response.message === 'success' && response.data) {
          this.selectedCompany = response.data;
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    } else {
      console.warn('No company info found in localStorage');
    }
  }

  loadJobs(): void {

    if (this.selectedCompany) {
      this._jobsApiService.getJobsByCompanyId(this.selectedCompany._id).subscribe(
        (response: any) => {
          
          if (response.jobs && response.jobs.length > 0) {
            this.jobs = response.jobs;
          } else {
            console.warn('No jobs found for the company');
          }
        },
        (error: any) => {
          console.error('Error fetching jobs:', error);
        }
      );
    }
  }
}
