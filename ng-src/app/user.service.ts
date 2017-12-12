import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { MessageService } from './message.service';
import { User } from './user';
import { HelperService } from './helper.service';
import { RemoteFormError } from './remoteFormError';


@Injectable()
export class UserService extends DataService {

  constructor(
    http: HttpClient,
    messageService: MessageService,
    helperService: HelperService
  ) {
    super(http, messageService, helperService);
    this.dataUrl = 'api/users';
    this.resourceType = 'User';
  }

  // TODO: replace id with token
  public getUserByToken(id: string): Observable<User> {
    return this.searchResources({
      'id': id
    }).map(resources => {
      if (resources.length === 1) {
        return new User(resources[0].values);
      } else if (resources.length === 0) {
        throw new Error('User not found');
      } else {
        throw new Error('Ambigous token');
      }
    });
  }

  public loginAttempt(login: string, password: string): Observable<User> {
    {

      return this.searchResources({
        'login': login
      }).
        map(resources => {
          if (resources.length === 1) {
            if (resources[0].values.password !== password) {
              throw new RemoteFormError('Invalid Password', 'password', 'mismatch');
            } else {
              return new User(resources[0].values);
            }
          } else if (resources.length === 0) {
            throw new RemoteFormError('User not found', 'login', 'notfound');
          } else {
            throw new RemoteFormError('Ambigous user credentials', 'login', 'ambiguous');
          }
        });
    }

  }

}

