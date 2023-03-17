export class SmgsItem implements Object {
  hid: number;
  text: string;
  type: number;
  sum:number;
}

export class SmgsList implements Object {
  total: number;
  rows: SmgsItem[];
}
