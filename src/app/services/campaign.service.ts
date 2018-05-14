import { Injectable } from '@angular/core';
import { IBaseServiceOperations } from './IBaseServiceOperations';
import { CampignDashboardViewModel, Campaign } from '../shared/Entities';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Constants } from '../shared/Common';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class CampaignService implements IBaseServiceOperations<CampignDashboardViewModel>{

  constructor(private http: HttpClient) { }

  controllerURL: string = "Campaign";
  serviceApiURL: string = Constants.API_BASE_URL + this.controllerURL;

  GetAll(): Observable<CampignDashboardViewModel[]> {
    return this.http.get<CampignDashboardViewModel[]>(this.serviceApiURL);
  }

  GetById(id: number): Observable<CampignDashboardViewModel> {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<CampignDashboardViewModel>(this.serviceApiURL, {params: params});
  }

  add(campaign: Campaign): Observable<HttpResponse<Campaign>>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };
    return this.http.post<Campaign>(this.serviceApiURL, campaign, { headers: new HttpHeaders({'Content-Type':  'application/json'}),observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<HttpResponse<Campaign>>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };
    return this.http.delete<Campaign>(this.serviceApiURL+"/"+id.toString(), { headers: new HttpHeaders({'Content-Type':  'application/json'}),observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
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
  };
}
