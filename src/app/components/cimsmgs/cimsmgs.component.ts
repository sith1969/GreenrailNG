import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CimSmgsItem } from 'src/app/model/cimsmgs';
import { DataList } from 'src/app/model/common';
import { GreenrailService } from 'src/app/services/greenrail.service';
import { MainService } from 'src/app/services/main.service';
import { CimsmgsDetailComponent } from '../cimsmgs-detail/cimsmgs-detail.component';
import { TabNavigatorData } from '../tab-navigator/tab-navigator.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cimsmgs',
  templateUrl: './cimsmgs.component.html',
  styleUrls: ['./cimsmgs.component.scss']
})

export class CimsmgsComponent {

  title ="CIMSMGS";
  timeBegin = '';
  timeEnd = '';
  @Input() params = null;
  // @Input() type = 'Cimsmgs';

  CimSmgsList: CimSmgsItem[];
  cimsmgsSubscription: Subscription;

  //  public predList = new BehaviorSubject<DataList>({total: 0, rows: []});
  list: DataList = {total: 0, rows: []};

  pageIndex = 0;
  pageSize = 30;
  pagesNumber = 1;
  request: TabNavigatorData = null;

  displayedColumns: string[] = ['expand','hid', 'text', 'type', 'sum','del', 'close'];

  spinnerVisible = false;

  constructor(  public mainService: MainService,
                public greenRail: GreenrailService,
                public datepipe: DatePipe,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<CimSmgsItem>,
                private sanitizer: DomSanitizer
    ){  }

  ngOnInit(){
    const now = new Date();
    const monthAgo = new Date();
     monthAgo.setDate(monthAgo.getDate() - 1);
     this.timeBegin =  this.datepipe.transform(monthAgo, 'dd.MM.YYYY');
     this.timeEnd =  this.datepipe.transform(now, 'dd.MM.YYYY');
    // this.timeBegin = this.mainService.session.getString(this.type + '_time_begin', this.datepipe.transform(monthAgo, 'dd.MM.YYYY'));
    // this.timeEnd = this.mainService.session.getString(this.type + '_time_end', this.datepipe.transform(now, 'dd.MM.YYYY'));

    this.cimsmgsSubscription = this.greenRail.getCimSmgsList().subscribe((data)=>{
      // this.CimSmgsList= data;
        this.list.rows =data.filter(data => data.type == 1) ;
        this.spinnerVisible = false;
    })

  }

  ngOnDestroy() {
    if(this.cimsmgsSubscription) this.cimsmgsSubscription.unsubscribe()
  }

  refresh(clear: boolean){

  }

  search() {

  }

  onClose() {

  }


  onSelect(i:number){

  }

    deleteItem(idx: number){
    this.mainService.showMessage('Удаление', 'Удалить выбранную запись?',
    {buttons:['Да', 'Нет']}).then(value => {
      if (value === 0) {
        // this.predService.nsiAbonDelete({un: this.list.rows[idx].un}).then(value => {
        //  this.list.rows.splice(idx, 1);
        //  this.nsiTable.renderRows();
        //  this.mainService.infoMessage('Удаление', 'Успешно', 4000);
        // });
        this.mainService.infoMessage('Удаление', 'Успешно', 4000);
      }
    })
  }


  load(pageIndex: number, pageSize: number, pagesNumber: number, append: boolean) {
    // this.spinnerVisible = true;
    // this.predService.apiDUList(this.type, (pageIndex + pagesNumber - 1) * pageSize, pageSize, append, this.params);
  }

  onPage($event) {
    this.request = $event;
    if ($event.pagesNumber > this.pagesNumber)
      this.load($event.pageIndex, $event.pageSize, $event.pagesNumber, true);
    else
      this.load($event.pageIndex, $event.pageSize, $event.pagesNumber, false);
  }



  edit (create: boolean, idx: number) {
    if (create)
       this.editDialog(idx, 'Добавить', create, new CimSmgsItem());
    else
       this.editDialog(idx, 'Редактировать', create, this.list.rows[idx]);
  }

  editDialog(index: number ,_message: string, createRow: boolean, objNsi: CimSmgsItem): void {
    let dialogRef = this.dialog.open(CimsmgsDetailComponent, {
      restoreFocus: false,
      // width: '1200px',
      width: '1220px',
      height: '',
      maxHeight: '95%',

      data: {messageDetail: _message, create: createRow, editdata: objNsi},
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((obj) => {
      if (createRow){
        if (obj !== null) {
          this.list.rows.splice(0, 0, obj);
          // this.nsiTable.renderRows();
        }
      } else {
        if (obj !== null) {
          // this.list.rows[this.rowIdx] = obj;
          this.list.rows[index] = obj;
          // this.nsiTable.renderRows();
        }
      }
    });
  };

}
