import {Component, OnInit} from '@angular/core';
import {GinService} from '../../services/gin.service';
import {Router} from '@angular/router';
import {GinModel} from '../../models/gin.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-gins-overview',
  templateUrl: './gins-overview.component.html',
  styleUrls: ['./gins-overview.component.scss']
})
export class GinsOverviewComponent implements OnInit {

  gins: GinModel[];
  filteredGins: any[];
  searchTerm: string;

  constructor(private ginService: GinService, private router: Router, private userService: UserService) {
    this.gins = [];
    this.ginService.getAllGins().subscribe(gins => {
      Object.keys(gins).forEach(ginKey => {
        this.gins.push(gins[ginKey]);
      });
      this.filteredGins = this.gins;
    });
  }

  ngOnInit() {

  }

  clear() {
    this.searchTerm = '';
    this.filteredGins = this.gins;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  filterGins() {
    this.filteredGins = [];
    if (this.searchTerm) {
      this.gins.forEach(gin => {
        if (gin.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          this.filteredGins.push(gin);
        }
      });
    }
  }

  viewGinDetails(i) {
    this.router.navigateByUrl('/gins/' + i);
  }

  onAddToGinventory(gin: GinModel) {
    this.userService.addGinKeyToUsers(gin);
  }
}
