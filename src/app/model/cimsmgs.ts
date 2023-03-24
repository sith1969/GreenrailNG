export class CimSmgsItem implements Object {
  hid: number;
  text: string;
  type: number;
  sum:number;

//   convert(input: CimSmgsRequest) {
//     this.hid=input.сimsmgs.hid;
//     this.text = input.сimsmgs.text;
//     this.type = input.сimsmgs.type;
//     this.sum = input.сimsmgs.sum;
//  }
}

export class CimSmgsList implements Object {
  total: number;
  rows: CimSmgsItem[];
}

// export interface CimSmgsItem {

// }


export class CimSmgsRequest {
  task: string;
  сimsmgs: {

    hid: number;
    text: string;
    type: number;
    sum:number;
   };

   constructor() {
      this.task = 'update';
      this.сimsmgs = { hid: 0, text: '', type: 0 ,sum: 0 };
   };

  init(src: CimSmgsItem) {
     if (src !== null) {this.сimsmgs = { hid: src.hid, text: src.text, type: src.type, sum: src.sum }};
  };
};
