import {Component, OnInit} from '@angular/core';
import {GinService} from '../../services/gin.service';
import {Router} from '@angular/router';
import {GinModel} from '../../models/gin.model';
import {UserService} from '../../../services/user.service';
import {AuthService} from "../../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-gins-overview',
  templateUrl: './gins-overview.component.html',
  styleUrls: ['./gins-overview.component.scss']
})
export class GinsOverviewComponent implements OnInit {

  gins: GinModel[];
  filteredGins: any[];
  searchTerm: string;
  loading = false;
  errorMessage: string;
  filterResult: string;

  constructor(private toastr: ToastrService, private ginService: GinService, private router: Router, private userService: UserService, private authService: AuthService) {
    this.errorMessage = '';
    this.gins = [];
    this.getAllGins();
  }

  ngOnInit() {

  }

  getAllGins() {
    this.loading = true;
    this.ginService.getAllGins().subscribe(gins => {
      Object.keys(gins).forEach(ginKey => {
        this.gins.push(gins[ginKey]);
      });
      this.filteredGins = this.gins;
      this.loading = false;
    }, err => this.errorMessage = err);
  }

  clear() {
    this.searchTerm = '';
    this.filteredGins = this.gins;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  filterGins() {
    if (this.searchTerm) {
      this.filteredGins = [];
      this.gins.forEach(gin => {
        if (gin.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          this.filteredGins.push(gin);
        } else {
          this.filterResult = 'No results found matching your search';
        }
      });
    }
  }

  viewGinDetails(i) {
    this.router.navigateByUrl('/gins/' + i);
  }

  onAddToGinventory(gin: GinModel) {
    if(this.authService.isAuthenticated()) {
      this.userService.addGinKeyToUsers(gin);
      this.toastr.success(gin.name + ' has been added succesfully to your Ginventory!');
    } else {
      // You must be logged in to add a gin to you inventory
      this.toastr.error('You must be logged in to add gins to your ginventory');
    }
  }
}
