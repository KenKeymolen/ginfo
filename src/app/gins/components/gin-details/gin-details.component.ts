import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GinService} from '../../services/gin.service';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-gin-details',
  templateUrl: './gin-details.component.html',
  styleUrls: ['./gin-details.component.scss']
})
export class GinDetailsComponent implements OnInit {

  ginIndex = '';
  gin: any;
  recipes: any[];

  constructor(private route: ActivatedRoute, private ginService: GinService, private recipeService: RecipeService) {
    this.ginIndex = this.route.snapshot.paramMap.get("id");
    this.ginService.getGinById(this.ginIndex).subscribe(dta => {
      this.gin = dta.data();
    });

    this.recipeService.getRecipesByGinId(this.ginIndex).subscribe(recipes => {
      this.recipes = recipes;
    });

  }

  ngOnInit() {
  }

}
