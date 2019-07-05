import {Component, OnInit} from '@angular/core';
import {GinService} from '../../services/gin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gins-overview',
  templateUrl: './gins-overview.component.html',
  styleUrls: ['./gins-overview.component.scss']
})
export class GinsOverviewComponent implements OnInit {

  gins: any[];
  filteredGins: any[];
  searchTerm: string;

  constructor(private ginService: GinService, private router: Router) { }

  ngOnInit() {

  }

  clear(){
    this.searchTerm = '';
    this.filteredGins = this.gins;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  filterGins() {
    this.filteredGins = [];
    if(this.searchTerm){
      this.gins.forEach(gin => {
        if(gin.payload.doc.data().name.toLowerCase().includes(this.searchTerm.toLowerCase())){
          this.filteredGins.push(gin);
        }
      })
    }
  }

  viewGinDetails(i){
    this.router.navigateByUrl('/gins/' + i);
  }
}
