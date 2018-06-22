import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule,
  MatTableDataSource, MatSortModule, MatIconModule, MAT_DIALOG_DATA, MatMenuModule,
  MatDividerModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatCardModule,
  MatRadioModule, MatNativeDateModule, MatAutocompleteModule
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, Validator, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsobsComponent } from './bsobs/bsobs.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AlertComponent } from './shared/alert/alert.component';
import { MagnitudeEntity, MagnitudeEntityViewModel } from './shared/Entities';
import { RouterModule, Routes, Router } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { EditCampaignComponent } from './shared/edit-campaign/edit-campaign.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './core/auth.service';
import { RapsodyRouteGaurd } from './core/route-gaurd';
import { AuthHeaderInterceptorService } from './core/auth-header-interceptor.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full'},
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: CampaignComponent, canActivate: [RapsodyRouteGaurd] },
  { path: 'MagnitudeEntity', component: BsobsComponent, canActivate: [RapsodyRouteGaurd] },
  { path: '**', component: CampaignComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BsobsComponent,
    FileuploadComponent,
    AlertComponent,
    CampaignComponent,
    EditCampaignComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatIconModule, HttpClientModule, MatDialogModule, MatCheckboxModule, FormsModule,
    MatDividerModule, MatMenuModule, MatFormFieldModule, MatSelectModule, MatInputModule,
    MatDatepickerModule, MatRadioModule, MatNativeDateModule, ReactiveFormsModule, MatAutocompleteModule, MatCardModule
  ],
  providers: [RapsodyRouteGaurd, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent, EditCampaignComponent]
})
export class AppModule {
}

