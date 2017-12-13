import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { MessageService } from './message.service';
import { Table } from './table';
import { HelperService } from './helper.service';

// import { UserTableService } from './user-table.service';

@Injectable()
export class TableService extends DataService {

  constructor(
    http: HttpClient,
    messageService: MessageService,
    helperService: HelperService
  ) {
    super(http, messageService, helperService);
    this.dataUrl = 'api/tables';
    this.resourceType = 'Table';
  }

  public getTableById(id: string): Observable<Table> {
    return this.getOne(id).map(resource => new Table(resource.values));
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

  // TODO finalize this
  public joinTable(tableId: string, userId: string): Observable<boolean> {
    return this.getOne(tableId).map(resource => true);
  }

}
