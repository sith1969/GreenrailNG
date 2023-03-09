import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CimSmgsItem } from 'src/app/model/cimsmgs';
import { DataList } from 'src/app/model/common';
import { MainService } from 'src/app/services/main.service';
import { TabNavigatorData } from '../tab-navigator/tab-navigator.component';

@Component({
  selector: 'app-cimsmgs',
  templateUrl: './cimsmgs.component.html',
  styleUrls: ['./cimsmgs.component.scss']
})
export class CimsmgsComponent {

  title ="CimsmgsText";
  timeBegin = '';
  timeEnd = '';
  @Input() params = null;
  @Input() type = 'date';

  CimSmgsList: CimSmgsItem[];
  cimsmgsSubscription: Subscription;

  // public predList = new BehaviorSubject<DataList>({total: 0, rows: []});
   list: DataList = {total: 0, rows: []};

  pageIndex = 0;
  pageSize = 30;
  pagesNumber = 1;
  request: TabNavigatorData = null;

  spinnerVisible = false;


  constructor( public datepipe: DatePipe, private mainService: MainService
     ){

  }

  ngOnInit(){
    const now = new Date();
    const monthAgo = new Date();
     monthAgo.setDate(monthAgo.getDate() - 1);
     this.timeBegin =  this.datepipe.transform(monthAgo, 'dd.MM.YYYY');
    // this.timeBegin = this.mainService.session.getString(this.type + '_time_begin', this.datepipe.transform(monthAgo, 'dd.MM.YYYY'));
    // this.timeEnd = this.mainService.session.getString(this.type + '_time_end', this.datepipe.transform(now, 'dd.MM.YYYY'));




    this.cimsmgsSubscription = this.mainService.getCimSmgsList().subscribe((data)=>{
      this.CimSmgsList= data;
    })

  }

  ngOnDestroy() {
    if(this.cimsmgsSubscription) this.cimsmgsSubscription.unsubscribe()
  }

  refresh(clear: boolean){

  }

  search() {

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

}
