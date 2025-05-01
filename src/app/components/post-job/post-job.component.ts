import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { SuccessDialogComponent } from "../success-dialog/success-dialog.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-post-job",
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: "./post-job.component.html",
  styleUrls: ["./post-job.component.css"],
})
export class PostJobComponent implements OnInit {
  company: any = {};
  jobForm!: FormGroup;
  companyId: string = "";
  skillsList: string[] = [
    "JavaScript",
    "HTML",
    "CSS",
    "Angular",
    "React",
    "Node.js",
    "Python",
    "Next.js",
    "vue",
    "OOP",
    "Problem Solving",
    "c#",
    "c++",
    "java",
    "php",
    "Design pattern",
    "Figma",
    "Photoshop",
    "Adobe Xd",
    "jQuery",
    "Sass",
    "Agile ",
    "Bootstrap",
    "PostgreSQL",
    "NoSQL Database",
    "Design Thinking",
    "Adobe Illustrator",
    "•UI/UX Design principles ",
    "Visual Design For Web",
  ];
  requirementsList: string[] = [
    "Bachelor's Degree",
    "2+ years experience",
    "Team player",
    "Good communication skills",
  ];

  constructor(
    private fb: FormBuilder,
    private hhtpClient: HttpClient,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const companyInfo = localStorage.getItem("companyInfo");
    if (companyInfo) {
      this.company = JSON.parse(companyInfo);
      this.companyId = this.company.id;
    }

    this.jobForm = this.fb.group({
      companyName: new FormControl(this.company.companyName, [
        Validators.required,
      ]),
      JobTitle: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3),
      ]),
      JobCategory: new FormControl("", [Validators.required]),
      JobSubCategory: new FormControl(["other"], [Validators.required]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1000),
      ]),
      JobType: new FormControl("Part-Time", [Validators.required]),
      salary: new FormGroup({
        from: new FormControl("", [Validators.required]),
        to: new FormControl("", [Validators.required]),
      }),
      skills: new FormControl([], [Validators.required]),
      JobHours: new FormGroup({
        from: new FormControl("", [Validators.required]),
        to: new FormControl("", [Validators.required]),
      }),

      jobLocation: this.fb.group({
        State: new FormControl("", [Validators.required]),
        government: new FormControl("", [Validators.required]),
      }),
      JoblocationType: new FormControl("", [Validators.required]),
      jobLevel: new FormControl("", [Validators.required]),
      jobRequirements: new FormControl([], [Validators.required]),
      status: new FormControl("Open", [Validators.required]),

      companyId: new FormControl(this.company.id, [Validators.required]),
      additionalJobForm: new FormControl(false),
    });
  }

  addJob() {
    const jobData = {
      ...this.jobForm.value,
    };

    this.hhtpClient
      .post<any>(`${environment.baseUrl}/jobs/create`, jobData)
      .subscribe({
        next: (response) => {
          this.openSuccessDialog(response.newJob._id);
        },
        error: (error) => {
          console.error("Error adding job:", error);
        },
      });

    return false;
  }

  openSuccessDialog(jobId: string): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: { jobId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "addQuestions") {
        this.router.navigate([`/Company/AdditionalQuestions`, jobId]);
      } else {
        this.router.navigate([`/Company/theJobs`]);
      }
    });
  }
}
