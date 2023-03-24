import { Component,Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CimSmgsRequest } from 'src/app/model/cimsmgs';
import { InputChecker } from '../UI/input/input-checker';
import { WaitDialogComponent } from '../UI/wait-dialog/wait-dialog.component';

@Component({
  selector: 'app-cimsmgs-detail',
  templateUrl: './cimsmgs-detail.component.html',
  styleUrls: ['./cimsmgs-detail.component.scss']
})
export class CimsmgsDetailComponent implements OnInit{

  cimSmgsReq: CimSmgsRequest = null;

  inputChecker: InputChecker;
  waitDialog: MatDialogRef<WaitDialogComponent>;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<CimsmgsDetailComponent>){
                  this.inputChecker = new InputChecker();
                  this.cimSmgsReq = new CimSmgsRequest();
                  this.cimSmgsReq.init(data.editdata );

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
