import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home/home/home.component"
import { PostJobComponent } from './components/post-job/post-job.component';
import { CompanyapplicantsComponent } from "./pages/CompanyApplicants/company/companyapplicants.component";
import { CandidatesComponent } from "./pages/Candidates/candidates/candidates.component";
import { ApplicantsCardGroupComponent } from "./components/applicantsCardGroup/applicants-card-group/applicants-card-group.component";
import { JobsComponent } from "./components/jobs/jobs/jobs.component";
import { RegisterComponent } from "./components/register/register.component";
import { RegisterTwoComponent } from "./components/register-two/register-two.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { AdditionalQuestionsComponent } from "./components/additional-questions/additional-questions.component";
import { UpdateJobComponent } from "./components/update-job/update-job.component";
import { NotfoundComponent } from "./pages/NotFound/NotFound/notfound/notfound.component";
import { CompanyProfileComponent } from "./components/company-profile/company-profile.component";
import {ApplicantsComponent} from './components/applicants/applicants.component'
import { PasswordComponent } from "./components/password/password.component";
import { ResetPasswordComponent } from "./components/resetPass/resetpass/resetpass.component";
import { VerifyOTPComponent } from "./pages/verifyOTP/verify-otp/verify-otp.component";


export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "Register", component: RegisterComponent },
  { path: "two", component: RegisterTwoComponent },
  { path: "sign", component: SignInComponent },
  { path: "forget-password", component: PasswordComponent },
  { path: "verifyOTP", component: VerifyOTPComponent },

  {
    path: "Company",
    component: CompanyapplicantsComponent,
    children: [
      { path: 'addJob', component: PostJobComponent },
      { path: 'AdditionalQuestions/:id', component: AdditionalQuestionsComponent },
      { path: 'theJobs', component: JobsComponent },
      { path: "applicantcards/:JobId", component: ApplicantsCardGroupComponent },
      { path: 'update-job/:id', component: UpdateJobComponent },
      { path: "reset", component: ResetPasswordComponent },
      { path: "applications/:JobId/:UserId", component: ApplicantsComponent },
       { path: "candidates", component: CandidatesComponent },
    ],
  }, {path: "myProfile", component: CompanyProfileComponent},
  
 
  { path: "**", component: NotfoundComponent }
];
