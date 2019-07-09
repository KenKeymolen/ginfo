import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user.model';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  mainBackgroundUrl = '';
  // dummyUser: UserModel = {
  //   username: 'KenKeymolen',
  //   email: 'mayte.vandevelde@hotmail.com',
  //   userKey: '',
  //   country: 'Belgium',
  //   memberSince: new Date().toString(),
  //   active: true,
  //   ginventory: []
  // };

  constructor(private userService: UserService) {
    this.mainBackgroundUrl = '../assets/images/background.jpg';
  }

  ngOnInit() {
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
