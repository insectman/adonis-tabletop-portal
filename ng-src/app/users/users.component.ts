import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getMany();
  }

  /*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addOne({ name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
  */

  getMany(): void {
    this.userService.getMany()
      .subscribe(users => this.users = users);
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteOne(user).subscribe();
  }

}
