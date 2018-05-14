import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/Operators';
import { Constants } from '../shared/Common';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  constructor(private http: HttpClient) { }

  upload(files, fileUploadActionMethod: string) {
    //let headers = new Headers();
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(Constants.API_BASE_URL + fileUploadActionMethod
      , files
      // ,{ headers: new HttpHeaders({'Content-Type':  'multiple/form-data'}) }
    )
      .pipe(        
        catchError(error => Observable.throw(error))
      );
  }
}
