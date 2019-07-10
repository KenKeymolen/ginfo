import { Component } from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {ToastrService} from "ngx-toastr";
import {ApplicationmanagementService} from "./services/applicationmanagement.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService, private toastr: ToastrService, private app: ApplicationmanagementService) {
    this.loadAnnouncement();
  }

  signout() {
    this.authService.logout();
    this.toastr.success('You\'ve been logged out successfully!');
  }

  loadAnnouncement() {
    this.app.getAnnouncements().subscribe(announcements => {
      Object.keys(announcements).forEach(key => {
        if(announcements[key].active === true) {
          this.toastr.info(announcements[key].content, '', {timeOut: 50000});
        }
      });
    });
  }
}
