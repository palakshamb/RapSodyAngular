import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpSentEvent, HttpResponse, HttpHandler, HttpHeaderResponse,
  HttpProgressEvent, HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
  // tslint:disable-next-line:max-line-length
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const userToken = this.authenticateService.USER_TOKEN;
    const tokenType = this.authenticateService.USER_TOKEN_TYPE;
    const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `${tokenType} ${userToken}`) });
    return next.handle(clonedRequest);
  }
  constructor(private authenticateService: AuthService) {
  }
}
