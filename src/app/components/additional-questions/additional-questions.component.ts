import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { JobsApiService } from '../../services/jobs-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additional-questions',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './additional-questions.component.html',
  styleUrls: ['./additional-questions.component.css']
})
export class AdditionalQuestionsComponent implements OnInit {
  jobId: string ='';
  additionalQuestionsForm!: FormGroup; 
  postedJob:any 
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder ,
    private httpClient : HttpClient,
    private _JobApiService: JobsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.jobId = id;
        
      } else {
        console.error('the id is not found');
      }
    });

    this.additionalQuestionsForm = this.fb.group({
      jobId:[this.jobId ,Validators.required],
      FirstQuestion: ['', Validators.required],
      SecondQuestion: ['', Validators.required],
      ThirdQuestion: ['', Validators.required],
      FourthQuestion: ['', Validators.required]
    });

    this._JobApiService.getTheJobById(this.jobId).subscribe({
      next:(response)=>{

        this.postedJob= response.foundedJob
        this.postedJob.additionalJobForm= true
      }

    })

  
}

  

  onSubmit() {
      const formData = {
        ...this.additionalQuestionsForm.value,
      };
      this.httpClient.post<any>(`${environment.baseUrl}/additionalQuestions`, formData).subscribe({
        next:(response)=>{
          Swal.fire({
            title: 'Success',
            text: 'Questions added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/Company/theJobs']);
          });
        },
        error:(error)=>{
          console.error(error)
        }
      })
      this._JobApiService.updateJobById(this.jobId, this.postedJob).subscribe({
       next:(res)=>{
      
        Swal.fire({
          title: 'Success',
          text: 'Job updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/Company/theJobs']);
        });
       }
      })
  }
}
