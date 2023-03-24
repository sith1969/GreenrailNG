export class SmgsItem implements Object {
  hid: number;
  text: string;
  type: number;
  sum:number;

  // convert(input: SmgsRequest) {
  //   this.hid=input.smgs.hid;
  //   this.text = input.smgs.text;
  //   this.type = input.smgs.type;
  //   this.sum = input.smgs.sum;
 //}
}

export class SmgsList implements Object {
  total: number;
  rows: SmgsItem[];
}

export class SmgsRequest {
  task: string;
  smgs: {

    hid: number;
    text: string;
    type: number;
    sum:number;
   };

   constructor() {
      this.task = 'update';
      this.smgs = { hid: 0, text: '', type: 0 ,sum: 0 };
   };

  init(src: SmgsItem) {
     if (src !== null) {this.smgs = { hid: src.hid, text: src.text, type: src.type, sum: src.sum }};
  };
}
