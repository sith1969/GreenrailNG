import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CimSmgsItem } from '../model/cimsmgs';
import { BehaviorSubject } from 'rxjs';
import { DataList } from '../model/common';
import { Router } from '@angular/router';
//import { DatePipe } from '@angular/common';
//import { MainService } from './main.service';
//import { SmgsItem } from '../model/smgs';


@Injectable({
  providedIn: 'root'
})
export class GreenrailService {

  apiURLs = {urlMain: 'http://localhost:3000/Cimsmgs'}

  // public session: PredSession = new PredSession();

  public CimSmgsListMain = new BehaviorSubject<DataList>({total: 0, rows: []});

  constructor(

              private http: HttpClient,

              private router: Router
             ) {  }

  getAPIUrl(srv: string): string {
    return this.apiURLs[srv];
    //'/aspred2' +
    // document.getElementsByTagName('base')[0].href +
  }



   getCimSmgsList() {
    return this.http.get<CimSmgsItem[]>(this.apiURLs.urlMain);

  }

  getCimSmgsDetail(hid: number) {
    return this.http.get<CimSmgsItem>(`${this.apiURLs.urlMain}/${hid}`);

  }

  // getTDColor(colIdx: number, i: number) {
  //   if (colIdx === 0) {
  //     if (i % 2 > 0)
  //       return '#FFFFFF';
  //     else
  //       return '#F0F0F0';
  //   } else if (colIdx === 1) {
  //     if (i % 2 === 0)
  //       return '#FFFFFF';
  //     else
  //       return '#F0F0F0';
  //   }
  //   return '#FFFFFF';
  // }
}
