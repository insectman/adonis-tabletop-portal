import { Resource } from './resource';
import { flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Table } from './table';
import { User } from './user';
import { DataService } from './data.service';
import { MessageService } from './message.service';
import { GameService } from './game.service';
import { IStringStringMap, HelperService } from './helper.service';
import { RemoteFormError } from './remoteFormError';


@Injectable()
export class TableService extends DataService {

  constructor(
    http: HttpClient,
    messageService: MessageService,
    helperService: HelperService,
    private gameService: GameService
  ) {
    super(http, messageService, helperService);
    this.dataUrl = 'api/tables';
    this.resourceClass = Table;
  }

  getOne(id: string): Observable<Table> {
    return super.getOne.call(this, id);
  }

  addOne(dataMap: IStringStringMap): Observable<Table> {
    return super.addOne.call(this, dataMap);
  }

  public getTableList(): Observable<Table[]> {
    {

      return this.getMany().
        map(resources => {
          if (resources.length) {
            return resources.map(resource => new Table(resource.values));
          } else {
            return [];
          }
        });
    }

  }

}
