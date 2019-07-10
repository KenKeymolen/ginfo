import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AnnouncementModel} from "../models/announcement.model";
import {ApplicationmanagementService} from "../services/applicationmanagement.service";
import {ToastrService} from "ngx-toastr";
import {GinModel} from "../gins/models/gin.model";
import {GinService} from "../gins/services/gin.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomModalComponent} from "../shared/components/custom-modal/custom-modal.component";
import {MatDialog} from "@angular/material";

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

  filteredGins: GinModel[];
  searchTerm: string;
  filterResult: string;

  animal: string;
  name: string;

  constructor(private _http: HttpClient,
              private app: ApplicationmanagementService,
              private toastr: ToastrService,
              private ginService: GinService,
              private router: Router,
              private modal: NgbModal,
              public dialog: MatDialog) {
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
      this.filteredGins = this.gins;
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

  filterGins() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      this.filteredGins = [];
      this.gins.forEach(gin => {
        if (gin.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          this.filteredGins.push(gin);
        } else {
          this.filterResult = 'No results found matching your search';
        }
      });
    } else {
      this.loadGins();
    }
  }

  createNewAnnouncement(announcement) {
    announcement.dateCreated = new Date().toString();
    announcement.active = false;
    this.app.updateAnnouncement(announcement).subscribe(res => {
      // Notify update announcement successfull
    })
  }

  onDeleteGin(ginKey: string) {
    this.ginService.deleteGin(ginKey).subscribe(res => {
      this.loadGins();
      this.toastr.success('Gin successfully deleted', 'Deletion Successfull', {timeOut: 5000});
    }, err => this.toastr.error(err));
  }

  onViewGinDetails(gin: GinModel) {
    this.router.navigateByUrl('/gins/' + gin.ginKey);
  }

  openDialog(title: string, content: string, reason: string, gin: GinModel): void {
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '500px',
      data: {title: title, content: content, reason: reason, ginKey: gin.ginKey}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        console.log(result);
        switch(result.reason) {
          case 'delete':
            this.onDeleteGin(result.ginKey);
          break;
        }
      }
    });
  }
}
