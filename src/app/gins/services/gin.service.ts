import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GinModel} from '../models/gin.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GinService {

  constructor(private firestore: AngularFirestore) { }

  getAllGins() {
    return this.firestore.collection('gins').snapshotChanges();
  }

  getGinById(i): any {
    return this.firestore.collection('gins').doc(i).get();
  }

  createGin(gin: GinModel) {
    return this.firestore.collection('gins').add(gin);
  }
}
