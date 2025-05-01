import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyBackService } from '../../services/company-back.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  showOTPInput: boolean = false;
  showNewPasswordInput: boolean = false;
  otpVerified: boolean = false;
  OTP: string = '';
  newPassword: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private companyBackService: CompanyBackService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      companyEmail: ['', [Validators.required, Validators.email]],
      otp: '',  
      newPassword: ['', [Validators.minLength(8)]], 
    });
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields correctly',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;

    }

    if (this.showOTPInput === false && this.forgetPasswordForm.valid && this.showNewPasswordInput === false) {
      this.handleSendMail();
    } else if (this.showOTPInput && this.forgetPasswordForm.valid) {
      this.OTP = this.forgetPasswordForm.get('otp')?.value;
      this.handleVerifyOTP();
    } else if (this.showNewPasswordInput === true && this.otpVerified === true) {      
      this.newPassword = this.forgetPasswordForm.get('newPassword')?.value;
      this.handleResetPassword();
    }
    
  }


  private handleSendMail(): void {
    const emailControl = this.forgetPasswordForm.get('companyEmail');

    if (emailControl?.invalid) {
      this.showValidationError(emailControl);
      return;
    }

    const { companyEmail } = this.forgetPasswordForm.value;
    this.companyBackService.sendMail(companyEmail).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.showOTPInput = true;
        });
      },
      (error) => {
        console.error(error);

        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  private handleVerifyOTP(): void {
    const companyEmail = this.forgetPasswordForm.get('companyEmail');


    if (!this.OTP) {
      Swal.fire({
        title: 'error',
        text: 'Please enter the OTP',
        icon: 'error',
        confirmButtonText: 'OK',

      });
      return;
    }

    this.companyBackService.verifyOTP(companyEmail?.value, this.OTP).subscribe({
      next: (response) => {
        
        Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.showNewPasswordInput = true;
          this.showOTPInput = false;
          this.otpVerified = true;

        })


      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Invalid OTP try again',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
    );
  }

  private handleResetPassword(): void {
    this.newPassword = this.forgetPasswordForm.get('newPassword')?.value;
    const companyEmail = this.forgetPasswordForm.get('companyEmail');

    if (!this.newPassword ) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
   

    this.companyBackService.restNewPass(companyEmail?.value, this.newPassword).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/sign']);
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
   
    );
  }

  private showValidationError(control: any): void {
    if (control?.hasError('required')) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid email address',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else if (control?.hasError('email')) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid email address',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
