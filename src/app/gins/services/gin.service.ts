import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GinModel} from '../models/gin.model';

@Injectable({
  providedIn: 'root'
})
export class GinService {

  constructor(private firestore: AngularFirestore) { }

  getAllGins() {
    return this.firestore.collection('gins').valueChanges();
  }

  createGin(gin: GinModel) {
    return this.firestore.collection('gins').add(gin);
  }
}
