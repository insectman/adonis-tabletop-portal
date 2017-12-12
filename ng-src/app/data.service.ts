import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Resource } from './resource';
import { MessageService } from './message.service';
import { IStringStringOrNumberMap, HelperService } from './helper.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  protected dataUrl: string;  // URL to web api
  protected resourceType: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private helperService: HelperService
  ) { }

  handleResourceError(operation: string, result?) {
    return this.helperService.observable.handleResourceError('DataService', operation, result);
  }

  private log = function (msg: string) {
    this.messageService.add('DataService' + ': ' + msg);
  };

  /** GET resources from the server */
  getMany(): Observable<Resource[]> {
    return this.http.get<IStringStringOrNumberMap[]>(this.dataUrl)
      .pipe(
      tap(_ => this.log(`fetched resources`)),
      catchError(this.helperService.observable.handleError<Resource[]>('DataService', 'getResources', []))
      ).map(dataArray => {
        const resourcesArray = [];
        Array.prototype.forEach.call(dataArray, (e) => resourcesArray.push(new Resource(e)));
        return resourcesArray;
      });
      /*.catch((e, o) => {
        const r = new Resource({}, []);
        return r;
      });*/

  }

  /** GET resource by id. Will 404 if id not found */
  getOne(id: number): Observable<Resource> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<IStringStringOrNumberMap>(url)
      .map(e =>  {
        this.log(`fetched hero id=${id}`);
        return new Resource(e);
      });
      // .catch(this.handleError<Resource>(`getOne id=${id}`));
  }

  /** PUT: update the resource on the server */
  updateOne(resource: Resource): Observable<any> {
    return this.http.put(this.dataUrl, resource, httpOptions).pipe(
      tap(_ => this.log(`updated resource id=${resource.id}`)),
      // catchError(this.handleError<any>('updateOne'));
    );
  }

  /** POST: add a new resource to the server */
  addOne(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.dataUrl, resource, httpOptions)
    .map(e =>  {
      this.log(`added resource w/ id=${resource.id}`);
      return e;
    });
    // .catch(this.handleError<Resource>(`addOne`));
  }

  /** DELETE: delete the resource from the server */
  deleteOne(resource: Resource | number): Observable<Resource> {
    const id = typeof resource === 'number' ? resource : resource.id;
    const url = `${this.dataUrl}/${id}`;

    return this.http.delete<Resource>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted resource id=${id}`)),
      // catchError(this.handleError<Resource>('deleteOne'))
    );
  }

  /* GET resources whose name contains search term */
  searchResources(params: IStringStringOrNumberMap): Observable<Resource[]> {

    const queryString = this.helperService.maps.mapToQueryString(params);

      return this.http.get<IStringStringOrNumberMap[]>(`${this.dataUrl}/?${queryString}`)
      /*.pipe(
      tap(_ => this.log(`fetched resources`)),
      catchError(this.helperService.observable.handleError<Resource[]>('DataService', 'getResources', []))
      )*/.map(dataArray => {
        const resourcesArray = [];
        Array.prototype.forEach.call(dataArray, (e) => resourcesArray.push(new Resource(e)));
        return resourcesArray;
      });

  }

}
