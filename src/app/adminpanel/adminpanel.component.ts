import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AnnouncementModel} from "../models/announcement.model";
import {ApplicationmanagementService} from "../services/applicationmanagement.service";
import {ToastrService} from "ngx-toastr";
import {GinModel} from "../gins/models/gin.model";
import {GinService} from "../gins/services/gin.service";

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  db = environment.firebase.databaseURL;

  totalUsers;
  totalGins;
  totalRecipes;
  announcement: AnnouncementModel;
  gins: GinModel[];

  constructor(private _http: HttpClient,
              private app: ApplicationmanagementService,
              private toastr: ToastrService,
              private ginService: GinService) {
    this.announcement = {
      active: undefined,
      content: '',
      dateCreated: '',
      key: ''
    };
    this.loadStatistics();
    this.loadGins();
    this.loadLatestAnnouncement();
  }

  ngOnInit() {

  }

  loadStatistics() {
    this._http.get(this.db + 'users.json').subscribe(data => {
      this.totalUsers = Object.keys(data).length;
    });

    this._http.get(this.db + 'gins.json').subscribe(data => {
      this.totalGins = Object.keys(data).length;
    });

    this._http.get(this.db + 'recipes.json').subscribe(data => {
      this.totalRecipes = Object.keys(data).length;
    })
  }

  loadGins() {
    this.gins = [];
    this.ginService.getAllGins().subscribe(gins => {
      Object.keys(gins).forEach(ginKey => {
        this.gins.push(gins[ginKey]);
      });
    });
  }

  loadLatestAnnouncement() {
    this.app.getAnnouncements().subscribe(announcements => {
      Object.keys(announcements).forEach(key => {
        this.announcement = announcements[key];
      });
    });
  }

  changeAnnouncementStatus(status: boolean) {
    this.announcement.active = status;
    this.app.updateAnnouncement(this.announcement).subscribe(res => {
      if(res.active === status) {
        this.toastr.success('Status changed to ' + res.active, 'Status Changed Successfully', {timeOut: 5000});
      } else {
        this.toastr.error('Status couldn\'t be changed', 'Something went wrong..', {timeOut: 5000});
      }
    });
  }

  createNewAnnouncement(announcement) {
    announcement.dateCreated = new Date().toString();
    announcement.active = false;
    this.app.updateAnnouncement(announcement).subscribe(res => {
      // Notify update announcement successfull
    })
  }

}
