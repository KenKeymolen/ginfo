import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: AngularFirestore) { }

  getRecipesByGinId(ginId: string) {
    return this.firestore.collection('recipes', ref => ref.where('ginId', '==', ginId)).valueChanges();

  }
}
