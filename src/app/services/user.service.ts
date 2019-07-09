import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable } from 'rxjs';
import {AuthService} from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.firebase.databaseURL + 'users/';
  urlEnd = '.json';

  constructor(private _http: HttpClient, private authService: AuthService) {

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

  addGinKeyToUsers(gin) {
    this._http.get(this.url + this.urlEnd).subscribe(users => {
      Object.keys(users).forEach(userKey => {
        if (this.authService.user !== null) {
          if (users[userKey].email === this.authService.user.email) {
            let user = users[userKey];
            if (user.ginventory === undefined || user.ginventory === null) {
              user.ginventory = [];
            }
            user.ginventory.push(gin.ginKey);
            this.updateUser(user).subscribe(res => {
              if (res) {
                console.log('Gin successfully added to ginventory');
              }
            });
          }
        } else {
          console.log('You need to be logged in to add a gin to your inventory');
        }
      });
    });
  }
}
