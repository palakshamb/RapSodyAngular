import { Injectable } from '@angular/core';
import { MagnitudeEntityViewModel } from '../shared/Entities'
import { IBaseServiceOperations } from '../services/IBaseServiceOperations'
import { HttpClient, HttpParams, HttpResponse, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../shared/Common';

@Injectable({
  providedIn: 'root'
})
export class MagnitudeEntityService implements IBaseServiceOperations<MagnitudeEntityViewModel> {
  constructor(private http: HttpClient) { }

  controllerURL: string = "Magnitude";
  GetAll(): Observable<MagnitudeEntityViewModel[]> {
    return this.http.get<MagnitudeEntityViewModel[]>(Constants.API_BASE_URL + this.controllerURL);
  }

  GetById(id: number): Observable<MagnitudeEntityViewModel> {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<MagnitudeEntityViewModel>(Constants.API_BASE_URL + this.controllerURL, {params: params});
  }

  update(value: MagnitudeEntityViewModel) : Observable<HttpResponse<MagnitudeEntityViewModel>>
  {
    let params = new HttpParams().set('id', value.id.toString());
    return this.http.put<MagnitudeEntityViewModel>(Constants.API_BASE_URL + this.controllerURL+ '/'+value.id.toString() , value, { headers: new HttpHeaders({'Content-Type':  'application/json'}),observe: 'response'});
  }
}
