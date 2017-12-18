import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {URLSearchParams} from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Resource } from './resource';
import { MessageService } from './message.service';
import { IStringStringMap, HelperService } from './helper.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  protected dataUrl: string;  // URL to web api
  protected resourceClass;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private helperService: HelperService
  ) {
    this.resourceClass = Resource;
    this.resourceClass.prototype = Resource.prototype;
  }

  handleResourceError(operation: string, result?) {
    return this.helperService.observable.handleResourceError('DataService', operation, result);
  }

  private log = function (msg: string) {
    this.messageService.add(this.constructor.name + ': ' + msg);
  };

  /** GET resources from the server */
  getMany(): Observable<Resource[]> {
    return this.http.get<IStringStringMap[]>(this.dataUrl)
      .pipe(
      tap(_ => this.log(`fetched many ${this.resourceClass.name}s`)),
      catchError(this.helperService.observable.handleError<Resource[]>('DataService', 'getMany', []))
      ).map(dataArray => {
        if (!dataArray.length) {
          return [];
        }
        return Array.prototype.map.call(dataArray, (data) => new this.resourceClass(data));
      });

  }

  /** GET resource by id. Will 404 if id not found */
  getOne(id: string): Observable<Resource> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<IStringStringMap>(url)
      .map(resource => {
        this.log(`fetched ${this.resourceClass.name} id=${id}`);
        return new this.resourceClass(resource);
      });
    // .catch(this.handleError<Resource>(`getOne id=${id}`));
  }

  /** PUT: update the resource on the server */
  updateOne(resource: Resource): Observable<any> {
    return this.http.put(this.dataUrl, resource, httpOptions).pipe(
      tap(_ => this.log(`updated ${this.resourceClass.name} id=${resource.values.id}`)),
      // catchError(this.handleError<any>('updateOne'));
    );
  }

  /** POST: add a new resource to the server */
  addOne(dataMap: IStringStringMap): Observable<Resource> {
    return this.http.post<Resource>(this.dataUrl, dataMap/*, httpOptions*/)
      .map(data => {
        const resource = new this.resourceClass(data);
        // console.log(resource);
        this.log(`added ${this.resourceClass.name} w/ id=${resource.values.id}`);
        return resource;
      });
  }

  /** DELETE: delete the resource from the server */
  deleteOne(id: string): Observable<Resource> {
    const url = `${this.dataUrl}/${id}`;
    // console.log('deleteOne ' + url);
    return this.http.delete<Resource>(url, httpOptions)
      .do(_ => this.log(`deleted ${this.resourceClass.name} id=${id}`));
  }

  searchByIds(ids: (string)[]): Observable<Resource[]> {
    if (!ids.length) {
      return of([]);
    }
    return this.getMany().map(resources => {
      const filtered = resources.filter(resource => ids.indexOf(resource.values.id) !== -1);
      if (filtered.length !== ids.length) {
        throw new Error('failed to find some of the ids');
      }
      resources = [];
      ids.forEach(id => resources.push(filtered.find(e => e.values.id === id)));
      this.log(`searched ${this.resourceClass.name}s by ids`);
      return resources;
    });

  }

  /* GET resources whose name contains search term */
  searchResources(params: IStringStringMap): Observable<Resource[]> {

    const queryString = this.helperService.maps.mapToQueryString(params);
    const url = `${this.dataUrl}/?${queryString}`;

    return this.http.get<Resource[]>(url, httpOptions)
      .map(dataArray => {
        const resourcesArray = [];
        this.log(`search ${this.resourceClass.name}`)
        Array.prototype.forEach.call(dataArray, (e) =>
          resourcesArray.push(new this.resourceClass(e)));
        return resourcesArray;
      });

  }

}
