import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectList, Campaign } from '../Entities';
import { CampaignService } from '../../services/campaign.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import {FormControl, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {
  type: string = "";
  CampaignName: string = "";
  Entities : SelectList;
  Currency : string;
  ClosingDate : Date;
  CalculationType : Boolean;
  Entity: string;
  CurrencyTypes: SelectList;
  constructor(public dialogRef: MatDialogRef<EditCampaignComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private campaignService : CampaignService) { 
    this.type = data.Type;
    this.Entities = data.Entities;
    this.CalculationType = data.CalculationType;
    this.CurrencyTypes = data.CurrencyTypes;
  }

  campaignValidator = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  addCampaign()
  {
    var campaign : Campaign= {
      name : this.CampaignName,
      closingDate: this.ClosingDate,
      static: "S",
      dynamic: "",
      lastModifiedDate:null
    };

    console.log(campaign)

    this.campaignService.add(campaign).subscribe(success => {
      this.dialogRef.close();
      console.log(success);
    }, error=>{
      this.dialogRef.close();
      console.log(error);
    });
  }

  getRandomIntInclusive(min, max) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

}
