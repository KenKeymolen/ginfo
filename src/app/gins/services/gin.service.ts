import { Injectable } from '@angular/core';
import { GinModel } from '../models/gin.model';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class GinService {

  url = environment.firebase.databaseURL + 'gins/';
  urlEnd = '.json';

  dummyGin: GinModel = {
    ginKey: '',
    name: 'Marula Gin',
    status: 'Approved',
    description: 'Geïnspireerd door het fenomeen van dronken olifanten in Afrika, besloten 2 jonge Belgen een exclusieve, originele gin te ontwikkelen. Hierbij maken ze gebruik van unieke botanicals, stuk voor stuk typerend voor de plaats waar ze vandaan komen.',
    content: '50',
    degrees: '40',
    taste: 'Prachtig gelaagd, met eerst de fruitige smaak van marula en oranjebloesem gevolgd door de kruidigheid van koriander. Lavendel en rozenblaadjes zorgen voor een mooie, zoete afdronk. Ideaal als aperitief of in combinatie met desserts.',
    ingredients: [
      'Jeneverbessen',
      'lavendel',
      'rozenblaadjes',
      'koriander',
      'oranjebloesem',
      'marulavrucht uit Namibië',
    ],
    ginReviews: [],
    imageUrl: 'https://cdn.shopify.com/s/files/1/1158/9148/products/18_1024x1024.png?v=1551147668',
  };

  constructor(private _http: HttpClient, private toastr: ToastrService) { }

  getAllGins(): Observable<GinModel[]> {
    return this._http.get<GinModel[]>(this.url + this.urlEnd);
  }

  createGin(gin: GinModel) {
    this.getAllGins().subscribe(gins => {
      if (gins[gin.ginKey] === undefined) {
        let newGin = gin;
        return this._http.post(this.url + this.urlEnd, gin).subscribe((res: any) => {
          newGin.ginKey = res.name;
          if (res) {
            this.updateGin(newGin).subscribe();
            this.toastr.success('Gin has been added successfully!')
          }
        }, err => this.toastr.error(err));
      }
    });
  }

  updateGin(updatedGin: GinModel) {
    return this._http.put(this.url + updatedGin.ginKey + this.urlEnd, updatedGin);
  }

  getGinByKey(key: string): Observable<GinModel> {
    return this._http.get(this.url + this.urlEnd).pipe(
      map(ginKeys => ginKeys[key]),
    );
  }
}
