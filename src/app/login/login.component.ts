import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../core/auth.service';
import { VALID } from '@angular/forms/src/model';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthenticationResult } from '../shared/Entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authenticatioService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }

  login() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.authenticatioService.clearSession();
      this.authenticatioService.login(this.loginForm.value.UserName, this.loginForm.value.Password).subscribe(success => {
        this.authenticatioService.setLoginFlag(true);
        this.authenticatioService.addSession(success as AuthenticationResult);
        this.router.navigateByUrl('/Home');
      }, error => {
        this.authenticatioService.setLoginFlag(false);
        if (error.status === 401) {
          // tslint:disable-next-line:max-line-length
          this.errorMessage = 'Either the username or the password you are using to login is incorrect. Please use the correct credentials.';
        } else {
          // tslint:disable-next-line:max-line-length
          this.errorMessage = 'There is a network error, please try again later.';
        }
        this.loginForm.controls['UserName'].setValue('');
        this.loginForm.controls['Password'].setValue('');
      });
    }
  }
}
