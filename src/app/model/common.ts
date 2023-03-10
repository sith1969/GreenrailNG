import { CimSmgsItem } from "./cimsmgs";
import { SmgsItem } from "./smgs";


export class DataList implements Object {
  total: number;
  rows: CimSmgsItem[] | SmgsItem[];
}

export class PopupMessage {
  severity: 'success' | 'error' | 'info' | 'debug' | 'warn';
  summary: string;
  detail: string;
}

