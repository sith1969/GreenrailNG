// import { MainService } from './../main.service';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

export class TabNavigatorData {

  constructor(length: number, pageIndex: number, pageSize: number, previousPageIndex: number, pagesNumber: number) {
    this.length = length;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.previousPageIndex = previousPageIndex;
    this.pagesNumber = pagesNumber;
  }

  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
  pagesNumber: number;
}

@Component({
  selector: 'app-tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.css']
})
export class TabNavigatorComponent implements OnInit, OnChanges {

  @ViewChild('inputEditPage') inputEditPage: ElementRef;

  @Input() length = 0;
  @Input() pageIndex = 0;
  previousPageIndex = 0;
  @Input() pagesNumber = 1;
  @Input() pageSize = 100;
  @Input() pageSizeOptions = [15, 30, 50, 100];
  @Input() showFirstLastButtons = true;
  @Input() showMoreButton = false;
  @Input() showStat = false;
  @Input() shortStat = false;
  @Input() itemsPerPageLabel = 'строк';
  @Input() hidePageSize = false;
  @Input() loaded = 0;
  @Input() extEdit = false;

  @Output() page: EventEmitter<TabNavigatorData> = new EventEmitter<TabNavigatorData>();

  showFromTo = true;
  pageEdit = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //this.calcValues();
  }

  ngOnInit(): void {
  }

  getMoreText() {
    const rest = this.length - this.pageIndex * this.pageSize - this.loaded;
    if (rest >= this.pageSize)
      return "Загрузить ещё " + this.pageSize + " записей";
    else if (rest > 0)
      return "Загрузить последние " + rest + " записей";
    else
      return "Записей больше нет...";
  }

  getStatText() {
    let toRecNo = (this.pageIndex + this.pagesNumber) * this.pageSize;
    if (toRecNo > this.length)
      toRecNo = this.length;
    if (!this.shortStat)
      return "Загружено страниц: " + this.pagesNumber + ", записи с " + (this.pageIndex * this.pageSize + 1) + " по " + toRecNo + ", всего записей: " + this.length;
    else
      return "Записи с " + (this.pageIndex * this.pageSize + 1) + " по " + toRecNo + ", всего: " + this.length;
  }

  getPages(): number {
    const i = Math.trunc(this.length/this.pageSize);
    return i * this.pageSize < this.length? i + 1 : i;
  }

  start() {
    if (this.pageIndex > 0) {
      this.pagesNumber = 1;
      this.previousPageIndex = this.pageIndex;
      this.pageIndex = 0;
      this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
    } else if (this.pagesNumber > 1) {
      this.pagesNumber = 1;
      this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
    };
  }

  end() {
    if (this.pageIndex < this.getPages() - 1) {
      this.pagesNumber = 1;
      this.previousPageIndex = this.pageIndex;
      this.pageIndex = this.getPages() - 1;
      this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
    }
  }

  incPage() {
    if (this.pageIndex < this.getPages() - 1) {
      if (this.pagesNumber === 1) {
        this.pagesNumber = 1;
        this.previousPageIndex = this.pageIndex;
        this.pageIndex ++;
        this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
      } else {
        this.previousPageIndex = this.pageIndex;
        this.pageIndex = this.pageIndex + this.pagesNumber > this.getPages() - 1? this.getPages() - 1 : this.pageIndex + this.pagesNumber;
        this.pagesNumber = 1;
        this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
      }
    }
  }

  decPage() {

    if (this.pageIndex > 0) {
      this.pagesNumber = 1;
      this.previousPageIndex = this.pageIndex;
      this.pageIndex --;
      this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
    } else if (this.pagesNumber > 1) {
      this.pagesNumber = 1;
      this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
    }
  }

  more() {
    if (this.length - this.pageIndex * this.pageSize - this.loaded > 0) {
      this.pagesNumber ++;
      this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
    } else {
      // this.mainService.infoMessage('Данные', 'Загружены все записи с указанной страницы...', 1000);
    };
  }

  enterPage() {
    if (this.showFromTo) {
      this.pageEdit = this.pageIndex + 1;
      this.showFromTo = false;
      setTimeout(()=>{
        this.inputEditPage.nativeElement.focus();
        this.inputEditPage.nativeElement.setSelectionRange(0, this.inputEditPage.nativeElement.value.length);
      }, 0);
    }
  }

  setPage() {
    this.previousPageIndex = this.pageIndex;
    if (this.pageEdit > this.getPages())
      this.pageIndex = this.getPages() - 1;
    else if (this.pageEdit < 1)
      this.pageIndex = 0;
    else
      this.pageIndex = this.pageEdit - 1;
    this.showFromTo = true;
    this.page.emit(new TabNavigatorData(this.length, this.pageIndex, this.pageSize, this.previousPageIndex, this.pagesNumber));
  }

  // keypressInputEdit($event: { keyCode: number; }) {
  //   if ($event.keyCode === 13) {
  //     this.setPage();
  //   }
  // }
  keypressInputEdit($event) {
    if ($event.keyCode === 13) {
      this.setPage();
    }
  }
}
