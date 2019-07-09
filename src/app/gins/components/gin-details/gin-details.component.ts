import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GinService} from '../../services/gin.service';
import {GinModel} from '../../models/gin.model';

@Component({
  selector: 'app-gin-details',
  templateUrl: './gin-details.component.html',
  styleUrls: ['./gin-details.component.scss']
})
export class GinDetailsComponent implements OnInit {

  ginIndex = '';
  gin: GinModel;
  recipes: any[];

  constructor(private route: ActivatedRoute, private ginService: GinService) {
    this.ginIndex = this.route.snapshot.paramMap.get('id');
    this.ginService.getGinByKey(this.ginIndex).subscribe(gin => {
      this.gin = gin;
    });
  }

  ngOnInit() {

  }
}
