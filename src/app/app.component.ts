import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rapsody';
  isUserLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
