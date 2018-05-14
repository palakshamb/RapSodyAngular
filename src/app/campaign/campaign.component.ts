import { Component, OnInit, ViewChild } from '@angular/core';
import { MagnitudeEntityService } from '../services/magnitude-entity.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatFormField } from '@angular/material';
import { MagnitudeEntityViewModel, CampignDashboardViewModel } from '../shared/Entities';
import { IBaseServiceOperations } from '../services/IBaseServiceOperations';
import { CampaignService } from '../services/campaign.service';
import { EditCampaignComponent } from '../shared/edit-campaign/edit-campaign.component';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  displayedColumns = ['Name', 'Entity', 'ClosingDate', 'LastModifiedDate', 'OpenedBy', 'Static', 'Dynamic', 'Delete'];
  dataSource = new MatTableDataSource<CampignDashboardViewModel>();
  magnitudeData: Array<MagnitudeEntityViewModel>;
  constructor(public dialog: MatDialog, private campaignService: CampaignService, private magnitudeEntityService: MagnitudeEntityService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getCampaignData();
  }

  private getCampaignData() {
    this.campaignService.GetAll().subscribe(success => {
      // console.log(success);
      this.dataSource = new MatTableDataSource<CampignDashboardViewModel>(success);
      this.dataSource.paginator = this.paginator;
    }, error => {
    });
  }

  pageEvent($event) {
    console.log($event);
  }

  addCampaign() {

    if (this.magnitudeData === undefined) {
      console.log('magnitudeData is empty! Loading from db.')
      this.magnitudeEntityService.GetAll().toPromise().then(data => {
        this.magnitudeData = data;
        this.loadCampaignDialog();
      }).catch(x => console.log(x));
    }
    else {
      this.loadCampaignDialog();
    }
  }

  private loadCampaignDialog() {
    var data = {
      Type: "Add",
      CampaignName: "",
      Entities: this.magnitudeData,
      Currency: "",
      ClosingDate: null,
      CalculationType: 0,
      CurrencyTypes: [{ Value: 1, Text: "EUR" }, { Value: 2, Text: "USD" }],
      Entity: ""
    };
    let dialogRef = this.dialog.open(EditCampaignComponent, {
      width: '700px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCampaignData();
    });
  }

  deleteCampaign(id: number) {
    this.campaignService.delete(id).subscribe(resp => {
      // console.log(resp);
      this.getCampaignData();
    });
  }
}
