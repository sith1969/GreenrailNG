import { CimSmgsItem } from "./cimsmgs";
import { SmgsItem } from "./smgs";


export class DataList implements Object {
  total: number;
  rows: CimSmgsItem[] | SmgsItem[];
}
