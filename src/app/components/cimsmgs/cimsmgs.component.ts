import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataList } from 'src/app/model/common';
import { TabNavigatorData } from '../tab-navigator/tab-navigator.component';

@Component({
  selector: 'app-cimsmgs',
  templateUrl: './cimsmgs.component.html',
  styleUrls: ['./cimsmgs.component.scss']
})
export class CimsmgsComponent {

  // public predList = new BehaviorSubject<DataList>({total: 0, rows: []});
   list: DataList = {total: 0, rows: []};

  pageIndex = 0;
  pageSize = 30;
  pagesNumber = 1;
  request: TabNavigatorData = null;

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
