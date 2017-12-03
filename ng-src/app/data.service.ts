import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Params } from '@angular/router';

import { MessageService } from './message.service';
import { Resource } from './resource';
import { mapToQueryString, IStringStringOrNumberMap } from './helpers';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {

  protected dataUrl: string;  // URL to web api
  protected resourceType: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET resources from the server */
  getMany(): Observable<Resource[]> {
    return this.http.get<IStringStringOrNumberMap[]>(this.dataUrl)
      .pipe(
      tap(_ => this.log(`fetched resources`)),
      catchError(this.handleError('getResources', []))
      ).map(dataArray => {
        const resourcesArray = [];
        Array.prototype.forEach.call(dataArray, (e) => resourcesArray.push(new Resource(e)));
        return resourcesArray;
      });

  }

  /** GET resource by id. Will 404 if id not found */
  getOne(id: number): Observable<Resource> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<Resource>(url).pipe(
      tap(_ => this.log(`fetched resource id=${id}`)),
      catchError(this.handleError<Resource>(`getOne id=${id}`))
    );
  }

  /** PUT: update the resource on the server */
  updateOne(resource: Resource): Observable<any> {
    return this.http.put(this.dataUrl, resource, httpOptions).pipe(
      tap(_ => this.log(`updated resource id=${resource.id}`)),
      catchError(this.handleError<any>('updateOne'))
    );
  }

  /** POST: add a new resource to the server */
  addOne(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.dataUrl, resource, httpOptions).pipe(
      tap((_) => this.log(`added resource w/ id=${resource.id}`)),
      catchError(this.handleError<Resource>('addOne'))
    );
  }

  /** DELETE: delete the resource from the server */
  deleteOne(resource: Resource | number): Observable<Resource> {
    const id = typeof resource === 'number' ? resource : resource.id;
    const url = `${this.dataUrl}/${id}`;

    return this.http.delete<Resource>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted resource id=${id}`)),
      catchError(this.handleError<Resource>('deleteOne'))
    );
  }

  /** Log a DataService message with the MessageService */
  private log(message: string) {
    this.messageService.add('DataService: ' + message);
  }

  /* GET resources whose name contains search term */
  searchResources(params: IStringStringOrNumberMap): Observable<Resource[]> {

    const queryString = mapToQueryString(params);

    return this.http.get<Resource[]>(`${this.dataUrl}/?${queryString}`).pipe(
      tap(_ => this.log(`found resources matching "${queryString}"`)),
      catchError(this.handleError<Resource[]>('searchResources', []))
    );
  }

}
