import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CimSmgsItem } from '../model/cimsmgs';
//import { SmgsItem } from '../model/smgs';


export class PredSession {
  version = 1;
  items: {[key: string]: any};

  constructor() {
    const obj = JSON.parse(localStorage.getItem("session"));
    if (obj !== null) {
      this.version = obj.version != undefined? obj.version : this.version;
      this.items = obj.items;
    } else
      this.items = {};
  }
  getNumber(name: string, defValue: number): number {
    const ret = this.items[name];
    return ret != undefined? ret : defValue;
  }
  getString(name: string, defValue: string): string {
    const ret = this.items[name];
    return ret != undefined? ret : defValue;
  }
  getBoolean(name: string, defValue: boolean): boolean {
    const ret = this.items[name];
    return ret != undefined? ret : defValue;
  }
  getObject(name: string, defValue: any): any {
    const ret = this.items[name];
    if (ret != undefined) {
      return ret;
    }
    return defValue;
  }
  put(name: string, value: number|string|boolean|object) {
    this.items[name] = value;
  }
  commit() {
    localStorage.setItem("session", JSON.stringify(this));
  }
};

@Injectable({
  providedIn: 'root'
})


export class MainService {

  url: string ='http://localhost:3000/Cimsmgs';

  public session: PredSession = new PredSession();

  constructor(private http: HttpClient) { }

  getCimSmgsList() {
    return this.http.get<CimSmgsItem[]>(this.url);

  }

  getCimSmgsDetail(hid: number) {
    return this.http.get<CimSmgsItem>(`${this.url}/${hid}`);

  }
}
