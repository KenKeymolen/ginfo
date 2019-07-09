import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  successMessage = '';
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.createLoginForm();
  }

  ngOnInit() {

  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(credentials) {
    this.authService.doLogin(credentials).then(res => {
      console.log(res);
    });
  }

  clear() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    this.login(this.loginForm.value);
  }

}
