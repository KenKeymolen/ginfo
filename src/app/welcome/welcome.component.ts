import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  mainBackgroundUrl = '';

  constructor(private userService: UserService) {
    this.mainBackgroundUrl = '../assets/images/background.jpg';
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
