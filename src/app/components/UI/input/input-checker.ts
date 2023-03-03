import { InputComponent } from './input.component';
import { Directive, ElementRef, Renderer2 } from '@angular/core';

export class InputCheckerItem {
  item: InputComponent;
  label: ElementRef | any;
  text: string;
}

export class InputCheckerResult {
  nsi: boolean;
  valid: boolean;
  msg: string;
}

@Directive()
export class InputChecker {

  items: InputCheckerItem[] = [];
  id: number = 2000;

  constructor() {
  }

  add(item: InputComponent, label: ElementRef | null, text: string) {
    item.id = this.id;
    this.id ++;
    this.items.push({item: item, label: label, text: text});

  }

  remove(id: number) {
    for (let i = 0; i < this.items.length; i ++) {
      if (this.items[i].item.id === id) {
        this.items.splice(i, 1);
        return;
      }
    }
  }

  check(): InputCheckerResult | null {
    for (let i = 0; i < this.items.length; i ++) {
      if (!this.items[i].item.disabled && !this.items[i].item.valid || !this.items[i].item.nsiValid) {

        this.items[i].item.focus();

        if (this.items[i].label !== null) {
          if (this.items[i].label.nativeElement !== undefined) {
            return {valid: this.items[i].item.valid, nsi: this.items[i].item.nsiValid, msg: this.items[i].label != null? this.items[i].label.nativeElement.innerHTML : ''} ;
          } else {
            if (this.items[i].label.innerHTML !== undefined)
              return {valid: this.items[i].item.valid, nsi: this.items[i].item.nsiValid, msg: this.items[i].label != null? this.items[i].label.innerHTML : ''} ;
          }
        }
        return {valid: this.items[i].item.valid, nsi: this.items[i].item.nsiValid, msg: this.items[i].text};
      }
    }
    return null;
  }
}
