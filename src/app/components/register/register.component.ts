import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RegistrationDataServiceService} from '../../services/registration-data-service.service'
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router, private registrationDataService: RegistrationDataServiceService) {
    this.registerForm = new FormGroup({
      companyName: new FormControl('', Validators.required),
      companyEmail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      companyPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onNext() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.registrationDataService.setFirstStepData(this.registerForm.value); 
      this.router.navigate(['/two']);
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control) {
          console.error(`${key} is ${control.valid ? 'valid' : 'invalid'}`);
        }
      });
    }
  }

  navigateToSignIn() {
    this.router.navigate(['/sign']);
  }

  signUpWithGitHub() {
    const clientId = environment.githubClientId;
    const redirectUri = environment.githubRedirectUri;
    const scope = 'user:email';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  }
}
