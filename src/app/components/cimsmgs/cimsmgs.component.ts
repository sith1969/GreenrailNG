import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CimSmgsItem } from 'src/app/model/cimsmgs';
import { DataList } from 'src/app/model/common';
import { GreenrailService } from 'src/app/services/greenrail.service';
import { MainService } from 'src/app/services/main.service';
import { TabNavigatorData } from '../tab-navigator/tab-navigator.component';

@Component({
  selector: 'app-cimsmgs',
  templateUrl: './cimsmgs.component.html',
  styleUrls: ['./cimsmgs.component.scss']
})
export class CimsmgsComponent {

  title ="Cimsmgs";
  timeBegin = '';
  timeEnd = '';
  @Input() params = null;
  @Input() type = 'Cimsmgs';

  CimSmgsList: CimSmgsItem[];
  cimsmgsSubscription: Subscription;

  //  public predList = new BehaviorSubject<DataList>({total: 0, rows: []});
   list: DataList = {total: 0, rows: []};

  pageIndex = 0;
  pageSize = 30;
  pagesNumber = 1;
  request: TabNavigatorData = null;

  displayedColumns: string[] = ['hid', 'text', 'type', 'total'];


  spinnerVisible = false;


  constructor(  public mainService: MainService,
                public greenRail: GreenrailService,
                public datepipe: DatePipe,

    ){

  }

  ngOnInit(){
    const now = new Date();
    const monthAgo = new Date();
     monthAgo.setDate(monthAgo.getDate() - 1);
     this.timeBegin =  this.datepipe.transform(monthAgo, 'dd.MM.YYYY');
     this.timeEnd =  this.datepipe.transform(now, 'dd.MM.YYYY');
    // this.timeBegin = this.mainService.session.getString(this.type + '_time_begin', this.datepipe.transform(monthAgo, 'dd.MM.YYYY'));
    // this.timeEnd = this.mainService.session.getString(this.type + '_time_end', this.datepipe.transform(now, 'dd.MM.YYYY'));




    this.cimsmgsSubscription = this.greenRail.getCimSmgsList().subscribe((data)=>{
      this.CimSmgsList= data;
      //  this.list= data;
    })

  }

  ngOnDestroy() {
    if(this.cimsmgsSubscription) this.cimsmgsSubscription.unsubscribe()
  }

  refresh(clear: boolean){

  }

  search() {

  }

  edit(flag:boolean, i:number){

  }

  onSelect(i:number){

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
