import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { MessageService } from './message.service';
import { User } from './user';

@Injectable()
export class UserService extends DataService {

  constructor(
    http: HttpClient,
    messageService: MessageService
  ) {
    super(http, messageService);
    this.dataUrl = 'api/users';
    this.resourceType = 'User';
  }

  public loginAttempt(login: string, password: string): Observable<User> {
    {
      return this.searchResources({
        'login': login,
        'password': password
      }).map(resources => {
        // log on error
        if (resources.length === 1) {
          return new User(resources[0].values);
        }
      });
    }

  }

}

