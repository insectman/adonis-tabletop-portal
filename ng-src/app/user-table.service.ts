import { Resource } from './resource';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { DataService } from './data.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { GameService } from './game.service';
import { HelperService } from './helper.service';
import { RemoteFormError } from './remoteFormError';
// import { MessageService } from './message.service';
import { User } from './user';
import { Table } from './table';

@Injectable()
export class UserTableService extends DataService {

  constructor(http: HttpClient, messageService: MessageService,
    helperService: HelperService, private userService: UserService, private gameService: GameService) {

    super(http, messageService, helperService);
  }

  public createTable(gameId, tableName): Observable<Table> {

    return this.gameService.getGameById(gameId).do(game => {if (!game) {
      throw new RemoteFormError('Game not found', 'gameId', 'notfound');
    }})
    .flatMap(_ => this.addOne(new Table({
      gameId, tableName, ownerId: this.userService.currentUser.id
    })).map(resource => {
      console.log(resource);
      return new Table(resource.values);
    }));

  }

}
