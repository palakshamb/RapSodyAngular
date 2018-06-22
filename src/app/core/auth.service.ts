import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginViewModel, AuthenticationResult } from '../shared/Entities';
import { Constants } from '../shared/Common';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'Auth/token';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  public login(username: string, password: string): any {
    const user: UserLoginViewModel = { userName: username, password: password };
    return this.httpClient.post(Constants.API_BASE_URL + this.url, user);
  }

  public setLoginFlag(value: boolean) {
    this.loggedIn.next(value);
  }

  public isUserLoggedIn() {
    const token = localStorage.getItem('access_token');
    const expiresat = localStorage.getItem('expires_at');
    const result = moment().isBefore(moment(JSON.parse(expiresat)));
    console.log(result);
    return result;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public get USER_TOKEN() {
    return localStorage.getItem('access_token');
  }

  public get USER_TOKEN_TYPE() {
    return localStorage.getItem('token_type');
  }

  public logout() {
    this.loggedIn.next(false);
    this.clearSession();
    this.router.navigate(['Login']);
  }

  public clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('token_type');
  }

  public addSession(tokenObj: AuthenticationResult) {
    const expiresAt = moment().add(tokenObj.expires_in, 'second');
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('token_type', tokenObj.token_type);
  }
}
