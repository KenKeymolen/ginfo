import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GinModel} from '../models/gin.model';

@Injectable({
  providedIn: 'root'
})
export class GinService {

  constructor(private firestore: AngularFirestore) { }

  getAllGins() {

  }

  getGinById(i) {

  }

  createGin(gin: GinModel) {

  }
}
