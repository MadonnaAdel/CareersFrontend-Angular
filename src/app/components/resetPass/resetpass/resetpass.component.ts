import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyBackService } from '../../../services/company-back.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetPasswordComponent implements OnInit {
  rsetpassForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyBackService: CompanyBackService 
  ) {
    this.rsetpassForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordsMatchValidator
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = localStorage.getItem('authToken') || '';
    });
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.rsetpassForm.valid) {
      const newPassword = this.rsetpassForm.value.newPassword;
      const confirmPassword = this.rsetpassForm.value.confirmPassword;
      this.companyBackService.resetPassword(this.token, newPassword, confirmPassword)
        .subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Password Changed!',
              text: 'Your password has been successfully updated.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then(() => {
              localStorage.clear();
              this.companyBackService.logout(); 
              this.router.navigate(['/sign']);
            });
          },
          (error) => {
            console.error('Password reset error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `An error occurred: ${error.message}`,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
          }
        );
    } else {
      this.markFormGroupTouched(this.rsetpassForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}