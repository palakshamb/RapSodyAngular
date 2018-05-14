import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, 
  MatTableDataSource, MatSortModule , MatIconModule, MAT_DIALOG_DATA, MatMenuModule,
  MatDividerModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, 
  MatRadioModule, MatNativeDateModule, MatAutocompleteModule} from '@angular/material';
import { HttpClientModule} from '@angular/common/http'
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, Validator, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BsobsComponent } from './bsobs/bsobs.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AlertComponent } from './shared/alert/alert.component';
import { MagnitudeEntity, MagnitudeEntityViewModel } from './shared/Entities'
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { EditCampaignComponent } from './shared/edit-campaign/edit-campaign.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/Home', pathMatch: 'full' , component: CampaignComponent},
  { path: 'Home', component: CampaignComponent },
  { path: 'MagnitudeEntity',component: BsobsComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BsobsComponent,
    FileuploadComponent,
    AlertComponent,
    CampaignComponent,
    EditCampaignComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule,MatButtonModule, 
    MatTableModule, MatPaginatorModule, MatSortModule, 
    MatIconModule, HttpClientModule, MatDialogModule, MatCheckboxModule, FormsModule,
    MatDividerModule, MatMenuModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatDatepickerModule, MatRadioModule, MatNativeDateModule,ReactiveFormsModule, MatAutocompleteModule
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent, EditCampaignComponent]
})
export class AppModule { }

