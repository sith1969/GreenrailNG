import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CimSmgsItem } from '../model/cimsmgs';
//import { SmgsItem } from '../model/smgs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string ='http://localhost:3000/Cimsmgs';

  constructor(private http: HttpClient) { }

  getCimSmgsList() {
    return this.http.get<CimSmgsItem[]>(this.url);

  }

  getCimSmgsDetail(hid: number) {
    return this.http.get<CimSmgsItem>(`${this.url}/${hid}`);

  }
}
