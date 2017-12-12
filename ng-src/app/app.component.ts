import { Component, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';

import { UserLoginComponent } from './user-login/user-login.component';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  isLoggedIn: boolean;
  title = 'JDTT';
  currentUser: User;

  @ViewChild(UserLoginComponent) userLoginComponent: UserLoginComponent;

  // TODO: replace id with token
  onUserLogin(user: User) {
    console.log(user, user.id);
    localStorage.setItem('userId', '' + user.values.id);
    this.isLoggedIn = true;
    this.currentUser = user;
  }

  constructor(private userService: UserService) {
    this.isLoggedIn = false;
  }

  // TODO: replace id with token
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }
    this.userService.getUserByToken(userId)
      .subscribe(user => {
        console.log(user);
        this.isLoggedIn = true;
      },
      e => {
        console.log(e.message);
      });
  }

  ngAfterViewInit() {
    this.userLoginComponent.onUserLogin.subscribe(user => {
      this.onUserLogin(user);
    });
  }

}
