import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  options = { headers: new HttpHeaders({ 'x-api-key': api.key }) };

  constructor(private http: HttpClient) { }

  // Loads Projects from the API
  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(api.baseUrl + api.loadProjects, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Adds a Rating to the API
  public addRating(id: number, rating: Rating): Observable<object> {
    return this.http.post(api.baseUrl + api.addRating(id), rating, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

export interface Rating {
  ratingId: number,
  value: number,
  comment: string
}

export interface Project {
  projectId: number,
  title: string,
  description: string,
  ratings: Rating[]
}

const api = {

  // TODO: Replace the value READONLY with the key given to you at the beginning of the workshop
  key: 'READONLY',

  baseUrl: 'https://caswell.dev/api/',
  loadProjects: 'projects',
  addRating: (id: number) => `projects/${id}/rating`
}
