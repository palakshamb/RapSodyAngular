import { Component, OnInit, Input, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { FileServiceService } from '../services/file-service.service'
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MagnitudeEntityService } from '../services/magnitude-entity.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})

export class FileuploadComponent implements OnInit {
  @Input() FileExtention: string = "csv";
  @Input() FileType: string = "";
  @Input() UploadAction: string = "";
  @Output() UploadedStatus = new EventEmitter();

  errors: Array<string> = [];
  fileNameChanged: boolean = false;
  fileName: string = "";
  constructor(private fileService: FileServiceService, private magnitudeServcie: MagnitudeEntityService) { }

  ngOnInit() {

  }

  onFileChange($event): void {
    let files = $event.target.files;
    this.fileNameChanged = true;
    this.errors = [];
    this.fileName = "";
    let target = $event.target || $event.srcElement;
    this.saveFiles(files);    
    target.value = '';
  }

  saveFiles(files) {
    if (files.length > 0 && (!this.isValidFiles(files))) {
      this.UploadedStatus.emit({ result: false, errors: this.errors });
      return;
    }
    if (files.length > 0) {
      let formData: FormData = new FormData();
      for (var j = 0; j < files.length; j++) {
        formData.append("file", files[j], files[j].name);
      }
      formData.set("enctype","multipart/form-data");
      this.fileName = files[0].name;
      this.fileService.upload(formData, this.UploadAction)
        .subscribe(
          success => {
            this.UploadedStatus.emit({ result: true, errors: "" });
            console.log(success)
          },
          error => {
            this.errors.push("Error while trying to upload the file. Please contact the administrator for more information.");
            this.UploadedStatus.emit({ result: false, errors: this.errors });
            console.log(error);
          });
      this.fileName = "";
    }
  }

  isValidFiles(files): boolean {
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  isValidFileExtension(files) {
    var extensions = (this.FileExtention.split(',')).map(function (x) { return x.toLocaleUpperCase().trim() });
    for (var i = 0; i < files.length; i++) {
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Extension of the file " + files[i].name + " is not allowed!");
      }
    }
  }
}
