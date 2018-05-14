import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, MAT_DIALOG_DATA, MatDialog, MatDialogContainer, MatCheckbox} from '@angular/material';
import { $$ } from 'protractor';
import { AlertComponent } from '../shared/alert/alert.component';
import { MagnitudeEntityService } from '../services/magnitude-entity.service';
import { MagnitudeEntityViewModel } from '../shared/Entities'

@Component({
  selector: 'app-bsobs',
  templateUrl: './bsobs.component.html',
  styleUrls: ['./bsobs.component.css']
})
export class BsobsComponent implements OnInit {
  // displayedColumns= ['Code', 'Label', 'Acronym', 'Currency', 'CodeES', 'SBU', 'SBULabel', 'IsActiveEntity'];
  displayedColumns= ['Code', 'Label', 'Acronym', 'Currency', 'IsActiveEntity'];
  dataSource = new MatTableDataSource<MagnitudeEntityViewModel>();
  
  constructor(public dialog: MatDialog, private magnitudeEntityService: MagnitudeEntityService) { 

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getMagnitudeData();
  }

  getMagnitudeData()
  {
    this.magnitudeEntityService.GetAll().subscribe(success=>{
      console.log(success);
      this.dataSource = new MatTableDataSource<MagnitudeEntityViewModel>(success);
      this.dataSource.paginator = this.paginator;
    }, error => {
    });
  }

  pageEvent($event)
  {
    console.log($event);
  }

  showUploadedStatus($event)
  {
    console.log($event);
    var message;
    if($event.result)
    {
      console.log('File Uploaded successfully')
      message = { message: "File has been uploaded successfully!" }      
    }
    else
    {
      message = { message: $event.errors[0] }
    }

    let dialogRef = this.dialog.open(AlertComponent, {
      width: '700px',
      data: message
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('here')
      this.getMagnitudeData();
    });
  }

  updateEntity(data: MagnitudeEntityViewModel)
  {
    console.log('UpdateEntity');
    console.log(data);
    this.magnitudeEntityService.update(data).subscribe(
      sucess=>{ console.log(sucess) }
      , error=>{console.log(error)}) ;
  }
}