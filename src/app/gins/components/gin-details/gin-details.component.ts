import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GinService} from '../../services/gin.service';

@Component({
  selector: 'app-gin-details',
  templateUrl: './gin-details.component.html',
  styleUrls: ['./gin-details.component.scss']
})
export class GinDetailsComponent implements OnInit {

  ginIndex = '';
  gin: any;
  recipes: any[];

  constructor(private route: ActivatedRoute, private ginService: GinService) {
    this.ginIndex = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {

  }
}
