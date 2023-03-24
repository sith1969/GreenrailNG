import { Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-floating-panel',
  templateUrl: './floating-panel.component.html',
  styleUrls: ['./floating-panel.component.scss']
})
export class FloatingPanelComponent implements OnInit, AfterViewInit {

  @ViewChild('me') me: ElementRef;

  @Input() control: any = null;
  @Input()
  set visible(value: boolean) {
    if (this._visible && !value) {
      setTimeout(() => {
        this._visible = false;
      }, 500);
    } else
      this._visible = value;
    if (value)
      setTimeout(() => {
        this.setPos();
      }, 0);

  }
  get visible() {
    return this._visible;
  }
  _visible = false;

  selfVisible = false;

    constructor(
    private renderer: Renderer2,
    public element: ElementRef
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //this.setPos();
  }

  setPos() {
    if (this.control !== null) {
      const rect = this.control._elementRef.nativeElement.getBoundingClientRect();
      let top = rect.top + rect.height;
      let left = rect.left;

      const meRect = this.me.nativeElement.getBoundingClientRect();
      if (meRect.height > 0 && top + meRect.height > window.innerHeight) {
        top = rect.top - meRect.height;
        left += rect.width;
      }

      if (meRect.width > 0 && left + meRect.width > window.innerWidth) {
        left = rect.left - meRect.width;
      }

      this.renderer.setStyle(this.me.nativeElement, 'left', left + "px");
      this.renderer.setStyle(this.me.nativeElement, 'top', top + "px");
    };
  }

}
