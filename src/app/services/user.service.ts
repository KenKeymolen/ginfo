import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.firebase.db_url + 'users.json';

  constructor(private _http: HttpClient) {

  }

  getAllUsers(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(this.url);
  }

  createUser(user: UserModel): void {
    if (this.userAvailable(user)) {
      this._http.post(this.url , user);
    } else {
      console.log('User exists already');
    }
  }

  userAvailable(userToCheck): boolean {
    let available = false;
    this._http.get(this.url).subscribe(data => {
      Object.keys(data).forEach(key => {
        if(data[key].username !== userToCheck.username && data[key].email !== userToCheck.email){
          available = true;
        } else {
          available = false;
        }
      });
    });
    return available;
  }
}
