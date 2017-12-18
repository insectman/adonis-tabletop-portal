import { Resource } from './resource';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { DataService } from './data.service';
import { UserService } from './user.service';
import { TableService } from './table.service';
import { MessageService } from './message.service';
import { GameService } from './game.service';
import { IStringStringMap, HelperService } from './helper.service';
import { RemoteFormError } from './remoteFormError';
// import { MessageService } from './message.service';
import { User } from './user';
import { Table } from './table';
import { UserTable } from './user-table';


@Injectable()
export class UserTableService extends DataService {

  constructor(http: HttpClient, messageService: MessageService, helperService: HelperService,
    private tableService: TableService, private userService: UserService, private gameService: GameService) {

    super(http, messageService, helperService);
    this.dataUrl = 'api/userTables';
    this.resourceClass = UserTable;
  }

  getOne(id: string): Observable<UserTable> {
    return super.getOne.call(this, id);
  }

  addOne(dataMap: IStringStringMap): Observable<UserTable> {
    return super.addOne.call(this, dataMap);
  }

  searchResources(params: IStringStringMap): Observable<UserTable[]> {
    const userTables = super.searchResources.call(this, params);

    return userTables.map(r => r.sort((e1, e2) => e1.values.timestamp < e2.values.timestamp));

  }

  public joinTable(tableId: string): Observable<Table> {
    const dataMap = {
      tableId,
      userId: this.userService.currentUser.values.id,
      timestamp: '' + new Date().getTime()
    };

    return this.searchResources(dataMap).map(resources => {
      // console.log(resources);
      if (resources && resources.length) {
        throw new Error('User have already joined the table');
      }
    })
      .flatMap(_ => this.addOne(dataMap)
        .map(resource => {
          // console.log(resource);
          if (!resource) {
            throw new Error('Could not join table');
          }
        }))
      .flatMap(_ => this.getTableWithUsersById(tableId));

  }

  //  public leaveTable(tableId: string): Observable<string> {
  public leaveTable(tableId: string): Observable<Table> {
    const dataMap = { tableId, userId: this.userService.currentUser.values.id };

    return this.searchResources(dataMap).map(resources => {
      if (!resources || !resources.length) {
        throw new Error('User have already left the table');
      }
      return resources[0].values.id;
    })
      .flatMap(utid => this.deleteOne(utid))
      .flatMap(_ => this.getTableWithUsersById(tableId));

  }

  public getJoinedUsers(tableId: string): Observable<User[]> {
    return this.searchResources({ tableId })
      .map(resources => resources.map(e => e.values.userId))
      // .filter(u => !!u.length)
      .flatMap(uids => this.userService.searchByIds(uids));
  }

  public createTable(gameId, tableName): Observable<Table> {

    return this.gameService.getOne(gameId).do(game => {
      if (!game) {
        throw new RemoteFormError('Game not found', 'gameId', 'notfound');
      }
      // console.log(game);
      // console.log(this.userService.currentUser);
    })
      .flatMap(_ => this.tableService.addOne({
        gameId, tableName, ownerId: this.userService.currentUser.values.id
      }))
      .do(t => console.log(t))
      .flatMap(table => this.joinTable(table.values.id)
        .map(_ => { console.log(table); return table; }));
    // .catch((e, o) => { console.log(e.toString()); return o; });

  }

  public getTableWithUsersById(id: string): Observable<Table> {
    return this.tableService.getOne(id).do(resource => {
      if (!resource) {
        throw new Error('Table not found');
      }
    })
      .flatMap(table => this.getJoinedUsers(table.values.id)
        .map(users => {
          if (users) {
            table.users = users;
            table.isCurrentTable = users.some(user =>
              user.values.id === this.userService.currentUser.values.id);
          }
          return table;
        }))
      .flatMap(table => this.gameService.getOne(table.values.gameId).map(game => {
        if (!game) {
          throw new Error('Game not found');
        }
        table.gameName = game.values.name;
        return table;
      }))
      .flatMap(table => {
        const owner = table.users.find(user =>
          user.values.id === table.values.ownerId);

        if (owner) {
          table.ownerName = owner.values.username;
          return of(table);
        }

        return this.userService.getOne(table.values.ownerId).map(user => {
          if (!user) {
            throw new Error('Table owner not found');
          }
          table.ownerName = user.values.username;
          return table;
        });
      });
  }

}
