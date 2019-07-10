import { Component } from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) {

  }

  signout() {
    this.authService.logout();
    this.toastr.success('You\'ve been logged out successfully!');
  }
}
