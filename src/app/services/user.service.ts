import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.firebase.databaseURL + 'users/';
  urlEnd = '.json';

  constructor(private _http: HttpClient) {

  }

  getAllUsers(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(this.url + this.urlEnd);
  }

  createUser(user: UserModel) {
    this.getAllUsers().subscribe(users => {
      if (users[user.userKey] === undefined) {
        let newUser = user;
        return this._http.post(this.url + this.urlEnd, user).subscribe((res: any) => {
          newUser.userKey = res.name;
          if (res) {
            this.updateUser(newUser).subscribe();
          }
        });
      } else {
        return 'User exists already';
      }
    });
  }

  updateUser(updatedUser: UserModel) {
    return this._http.put(this.url + updatedUser.userKey + this.urlEnd, updatedUser);
  }
}
