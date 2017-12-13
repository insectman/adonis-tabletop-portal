import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataService } from './data.service';
import { MessageService } from './message.service';
import { Game } from './game';
import { HelperService } from './helper.service';

@Injectable()
export class GameService extends DataService {

  constructor(
    http: HttpClient,
    messageService: MessageService,
    helperService: HelperService
  ) {
    super(http, messageService, helperService);
    this.dataUrl = 'api/tables';
    this.resourceType = 'Table';
  }

  public getGameById(id: string): Observable<Game> {
    return this.getOne(id).map(resource => new Game(resource.values));
  }

}
