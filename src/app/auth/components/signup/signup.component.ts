import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.clear();
    this.buildSignupForm();
  }

  ngOnInit() {
  }

  buildSignupForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      country: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      confirm_password: ['', Validators.required],
    });
  }

  printFormValues() {
    console.log(this.registerForm);
  }


  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  onSubmit() {
    this.clear();
    if (this.registerForm.valid === true) {
      if (this.registerForm.controls['password'].value !== this.registerForm.controls['confirm_password'].value) {
        this.registerForm.controls['password'].setErrors({'incorrect': true});
        this.registerForm.controls['confirm_password'].setErrors({'incorrect': true});
        this.errorMessage = 'Passwords do not match.';
      } else {
        // Create User
        this.authService.doRegister(this.registerForm.value).then(res => {
          this.successMessage = 'Account created successfully! ';
          // Save user to db + key
        });
      }
    } else {
      if (this.registerForm.controls['password'].hasError('minlength')) {
        this.errorMessage = 'Password needs to be at least 6 characters';
      } else {
        this.errorMessage = 'All fields need to be filled in!';
      }
    }
  }

  clear() {
    this.errorMessage = '';
    this.successMessage = '';
  }

}
