import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../../../services/user.service';
import { UserModel} from '../../../models/user.model';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
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
          let newUser: UserModel = {
            username: this.registerForm.controls['username'].value,
            email: this.registerForm.controls['email'].value,
            userKey: '',
            active: true,
            country: this.registerForm.controls['country'].value,
            memberSince: new Date().toString(),
            ginventory: [],
          }
          this.userService.createUser(newUser);
        }, err => this.errorMessage = err);
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
