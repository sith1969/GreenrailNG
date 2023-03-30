import { Component,Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CimSmgsRequest } from 'src/app/model/cimsmgs';
import { SmgsRequest } from 'src/app/model/smgs';
import { InputChecker } from '../UI/input/input-checker';
import { WaitDialogComponent } from '../UI/wait-dialog/wait-dialog.component';

@Component({
  selector: 'app-smgs-detail',
  templateUrl: './smgs-detail.component.html',
  styleUrls: ['./smgs-detail.component.scss']
})
export class SmgsDetailComponent {
  SmgsReq: SmgsRequest = null;

  inputChecker: InputChecker;
  waitDialog: MatDialogRef<WaitDialogComponent>;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<SmgsDetailComponent>){
                  this.inputChecker = new InputChecker();
                  this.SmgsReq = new SmgsRequest();
                  this.SmgsReq.init(data.editdata );

  }

  ngOnInit():void{
    if (this.data.create) {
      this.data.editdata.hid = 0;
      this.data.editdata.type = 2;

    }
  }
  onClickDetail(value: number) {
    if (value === 1000) {

    } else
      this.dialogRef.close(null);
  }
}

