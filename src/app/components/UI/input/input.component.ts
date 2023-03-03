import { UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// import { Moment } from 'moment';
const moment = _moment;
import {AbstractControl, ValidatorFn} from '@angular/forms';

import { InputChecker } from './input-checker';

export class InputComboOption{
  text: string;
  img: string;
  value: any | null;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})


export class InputComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

  id = 0;

  //--------------------------------------------------------------------------------------------------------------------
  //  VALUE

  @Input()
  set value(val: string) {

    if (val === undefined) {
      return;
    }

    if (val !== null && this.paddingLen > 0 && !this.hasFocus())
      val = this.getPadding(val);

    if (this.type === 'text' || this.type === 'combo' || this.type === 'nsi') {
        this.textValidator.setValue(val);
    } else if (this.type === 'date') {
      this.dateValidator.setValue(moment(val, 'DD.MM.YYYY'))
    } else if (this.type === 'datetime') {
      if (!this.showSeconds) {
        this.dateValidator.setValue(moment(val, 'DD.MM.YYYY hh:mm'))
        const dt = this.dateValidator.getRawValue();
        const h = dt.hours();
        this._hours = !isNaN(h)? this.getPadding2Zero(h.toString()) : '';
        const m = dt.minutes();
        this._minutes = !isNaN(m)? this.getPadding2Zero(m.toString()) : '';
      } else {
        const dt = this.dateValidator.getRawValue();
        this.dateValidator.setValue(moment(val, 'DD.MM.YYYY hh:mm:ss'))
        const h = dt.hours();
        this._hours = !isNaN(h)? this.getPadding2Zero(h.toString()) : '';
        const m = dt.minutes();
        this._minutes = !isNaN(m)? this.getPadding2Zero(m.toString()) : '';
        const s = dt.seconds();
        this._seconds = !isNaN(s)? this.getPadding2Zero(s.toString()) : '';
      }
    };

    this._valueSelected = this.value;

    if (this.type === 'combo') {
      this.options.forEach(el => {
        if (el.value === val)
          this.textValidator.setValue(el.text);
      });
    }

    this.setWidth();
  }
  get value(): any {

    if (this.type === 'combo') {
      const val = this.textValidator.getRawValue();
      for (let i = 0; i < this.options.length; i ++) {
        if (this.options[i].text == val)
          return this.options[i].value;
      }
      return null;
    } else if (this.type === 'date') {
      const ret = this.dateValidator.getRawValue();
      return ret !== null? this.dateValidator.getRawValue().format("DD.MM.YYYY") : null;
    } else if (this.type === 'datetime') {
      const ret = this.dateValidator.getRawValue();
      return ret !== null? this.dateValidator.getRawValue().format("DD.MM.YYYY") + ' ' + this.getPadding2Zero(this._hours) + ':' + this.getPadding2Zero(this._minutes) + ':' + this.getPadding2Zero(this._seconds) : null;
    } else if (this.valueType === 'string')
      return this.textValidator.getRawValue();
    else if (this.valueType === 'number') {
      const ret = this.textValidator.getRawValue();
      if (ret === '' || ret === null)
        return ret;
      else {
        const out = Number.parseInt(this.textValidator.getRawValue());
        return !isNaN(out)? out : null;
      }
    };
    return this.textValidator.getRawValue();
  }
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  emit(value: any) {
    if (this.valueType === 'string')
      this.valueChange.emit(value);
    else if (this.valueType === 'number') {
      if (value === '')
        this.valueChange.emit(null);
      else if (value !== '-') {
        const res = Number.parseInt(value)
        if (!isNaN(res) && typeof(res) == 'number')
          this.valueChange.emit(res);
        else
        {
          this.valueChange.emit(null);
          this.value = '';
        };
      }
    }
  }

  _valueSelected = '';

  //--------------------------------------------------------------------------------------------------------------------
  //

  @Output('select') select: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set width(value: number) {
    this.widthpx = value + 'px';
  }
  @Input() widthpx = '120px';
  @Input() autowidth = false;

  left = 0;
  @Input() type = 'text';

  setWidth() {
    if (this.autowidth) {
      if (this.type === 'date')
        this.widthpx = '100px';
      else if (this.type === 'datetime') {
        if (!this.showSeconds)
          this.widthpx = '134px';
        else
          this.widthpx = '162px';
      }
    };
  }

  @Input() set options(value: any[]) {
    if (!this.comboOne)
      this._options = value;
    else {
      if (this._options.length == 0) {
        this._options = [];
        value.forEach((el: any) => {
          this._options.push({text: el.text, img: el.img, value: el.value});
        });
      }
    }
  }
  get options(): any[] {
    return this._options;
  };
  _options: InputComboOption[] = [];

  @Input() valueType = "string";
  @Input() maxlength = 1024;
  @Input() padding = '';
  @Input() paddingLen = 0;
  @Input() bgLabel = '';
  @Input() label = '';
  @Input() imgButton = '';

  @Input() htmlInputType = '';

  //-------------------------------------------------------------------------------------------------------------------
  // Validators

  defaultValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this._extvalid) {
        if ((control.value === null || control.value === '') && this._empty)
          return null;

        if (this._min !== null && control.value < this._min)
          return {numberError: 'less then min value'};
        if (this._max !== null && control.value > this._max)
          return {numberError: 'above then max value'};

        return null;
      }

      return {extValidation: false}
    };
  }

  stringOfDigits(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>  {
      if (control.value === '' || control.value === null)
        return null;
      const n = Number(control.value);
      const result = (!Number.isNaN(n)? null : {wrongValue: control.value});
      return result;
    }
  }

  _validator = '';
  @Input()
  set validator(val: string) {
    this._validator = val;
    if (this._validator === 'hour') {
      this.paddingLen = 2;
      this.padding = '0';
    } else if (this._validator === 'minute') {
      this.paddingLen = 2;
      this.padding = '0';
    };
  }
  get validator() {
    return this._validator;
  };

  _extvalid = true;
  @Input() set extvalid(val: boolean) {
    this._extvalid = val;
    this.textValidator.updateValueAndValidity();
  }
  get extvalid(): boolean {
    return this._extvalid;
  }

  _min: number | null = null;
  @Input() set min(val: number | null) {
    this._min = val;
    if (val !== null && this.type === 'text' && this.validator === '')
      this.textValidator.updateValueAndValidity();
  }
  get min(): number | null {
    return this._min;
  };

  _max: number | null = null;
  @Input() set max(val: number | null) {
    this._max = val;
    if (val !== null && this.type === 'text' && this.validator === '')
      this.textValidator.updateValueAndValidity();
  }
  get max(): number | null {
    return this._max;
  };

  @Output() imgClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() nsiSelected = false;
  @Output() nsiDeselect: EventEmitter<any> = new EventEmitter<any>();
  @Input() hideNsiWarn = false;

  @Input() clear = false;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    let validator: UntypedFormControl | null = null;
    if (this.type === 'text' || this.type === 'nsi' || this.type === 'combo')
      validator = this.textValidator;
    else if (this.type === 'date' || this.type === 'datetime')
      validator = this.dateValidator;
    if (validator !== null) {
      if (!value)
        validator.enable();
      else
        validator.disable();
    }
  } get disabled() {
    return this._disabled;
  }
  _disabled = false;
  @Input() autofocus = false;

  @Output() disabledClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() keyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
  @Output() nsiKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() nsiOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('datePicker') datePicker: MatDatepicker<Date>;

  @Input() comboLazy = false;
  @Output() comboLazyOptions = new EventEmitter<InputComponent>();
  @Input() comboOne = false;
  @ViewChild('comboMenu') comboMenu: MatMenu;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @Input() comboAutoOpen = false;

  @ViewChild('inputText') inputText: ElementRef;
  @ViewChild('inputCombo') inputCombo: ElementRef;
  @ViewChild('inputNsi') inputNsi: ElementRef;
  @ViewChild('inputDate') inputDate: ElementRef;

  get valid(): boolean {
    if (this.type === 'date')
      return this.disabled || !this.dateValidator.invalid;
    else if (this.type === 'text' || this.type === 'combo')
      return this.disabled || !this.textValidator.invalid;
    else if (this.type === 'datetime')
      return this.disabled || (!this.dateValidator.invalid && this.validHours && this.validMinutes && this.validSeconds);
    return true;
  }

  get nsiValid(): boolean {
    if (this.type !== 'nsi' )
      return true;
    return this.nsiSelected || (this.value === '' && this.empty);
  }

  validStyle = {};
  invalidStyle = {'text-decoration': 'underline dotted red', 'color': 'red'};
  invalidStyle2 = {'broder-color': 'red'};
  textValidator = new UntypedFormControl('', [this.defaultValidator()]);
  dateValidator = new UntypedFormControl(moment());

  @Input() set empty(val: boolean) {
    this._empty = val;
    if (this.type === 'text') {
      if (!this.empty)
        this.textValidator.addValidators([Validators.required]);
      else
        this.textValidator.removeValidators([Validators.required]);
      this.textValidator.updateValueAndValidity();
    } else if (this.type === 'date' || this.type === 'datetime') {
      if (!this.empty)
        this.dateValidator.addValidators([Validators.required]);
      else
        this.dateValidator.removeValidators([Validators.required]);
      this.dateValidator.updateValueAndValidity();
    }
  }
  get empty() {
    return this._empty;
  }
  _empty = true;

  @Input() checker: InputChecker = null;
  @Input() checkerLabel: ElementRef = null;
  @Input() checkerText = '';

  _hours = '00';
  _minutes = '00'
  _seconds = '00';
  @Input() showSeconds = false;
  @Input() get validHours() {
    const num = Number(this._hours);
    return !Number.isNaN(num) && num >= 0 && num <= 23;
  }
  @Input() get validMinutes() {
    const num = Number(this._minutes);
    return !Number.isNaN(num) && num >= 0 && num <= 59;
  }

  @Input() get validSeconds() {
    const num = Number(this._seconds);
    return !Number.isNaN(num) && num >= 0 && num <= 59;
  }

  //-------------------------------------------------------------------------------------------------------------------
  // Class methods

  constructor(public element: ElementRef, public rederder: Renderer2) {
  }

  ngOnInit(): void {

    if (this.checker !== null) {
      this.checker.add(this, this.checkerLabel, this.checkerText);
    }
    if (this.type === 'datetime') {
      //this.dateValidator.setValue(moment());
      this.width = 134;
      this.maxlength = 10;
    } else if (this.type === 'date') {
      //this.dateValidator.setValue(moment());
      this.maxlength = 10;
    }

    //this.textValidator.clearValidators();

    if (this._validator === 'hour') {
      this.paddingLen = 2;
      this.padding = '0';
      this.textValidator.setValidators([this.defaultValidator(), Validators.min(0), Validators.max(23)]);
      this.textValidator.updateValueAndValidity();
    } else if (this._validator === 'minute') {
      this.paddingLen = 2;
      this.padding = '0';
      this.textValidator.setValidators([this.defaultValidator(), Validators.min(0), Validators.max(59)]);
      this.textValidator.updateValueAndValidity();
    } else if (this._validator === 'digits') {
      if (this.empty)
        this.textValidator.setValidators([this.defaultValidator(), this.stringOfDigits()]);
      else
        this.textValidator.setValidators([this.defaultValidator(), this.stringOfDigits(), Validators.required]);
      this.textValidator.updateValueAndValidity();
    } else {
      if (!this.empty) {
        this.textValidator.setValidators([this.defaultValidator(), Validators.required]);
        this.textValidator.updateValueAndValidity();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.checker !== null)
      this.checker.remove(this.id);
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.focus();
    };
    if (this.comboAutoOpen) {
      this.openCombo();
    }
  }

  ngAfterContentInit(): void {
  }

  onClearValue() {
    if (!this.disabled && this.value !== '' ) {
      this.value = '';
      this.nsiSelected = false;
      this.nsiDeselect.emit();
      this.emit('');
      if (this.type === 'date' || this.type === 'datetime')
        this.dateValidator.setValue('');
      else if (this.type === 'text' || this.type === 'nsi' || this.type === 'combo')
        this.textValidator.setValue('');
    };
  }

  nsiSelect(sel: boolean) {
    this.nsiSelected = sel;
    if (!sel)
      this.nsiDeselect.emit(true);
  }

  menuClick(item: any) {
    this.value = item.value;
    this.textValidator.setValue(item.text);
    this.emit(this.value);
    this.select.emit(item)
  }

  keyupEvent($event) {
    if ($event.keyCode < 33 || $event.keyCode > 39)
      this.emit(this.value);
    this.keyup.emit($event);
    if (this.imgButton !== '' && $event.key === 'Enter') {
      this.imgClick.emit($event);
    }
  }

  keyupNsiEvent($event) {
    if ($event.key === 'Backspace' || $event.key === 'Delete') {

      this.emit(this.value);
      this.nsiSelect(false);
      return;
    };
    if ($event.keyCode <= 40)
      return;

    const newValue = this.value;
    if (this._valueSelected !== newValue)
      this.nsiSelect(false);

    this.valueChange.emit(this.value);
  }

  keyupDateEvent($event) {
    if ($event.key === 'Enter') {
      this.keyup.emit($event);
    }
  }

  keyupComboEvent($event) {
    if (!this.comboLazy ) {
      if ($event.key === 'ArrowDown')
        this.menuTrigger.openMenu();
    } else {
      this.comboLazyOptions.emit(this);
      this.menuTrigger.openMenu();
    }
  }

  openCombo() {
    if (!this.comboLazy ) {
      this.menuTrigger.openMenu();
    } else {
      this.comboLazyOptions.emit(this);
      //this.menuTrigger.toggleMenu();
      this.menuTrigger.openMenu();
    }
  }

  nsiOpenEvent(open: boolean) {
    if (!this.disabled) {
      this.nsiOpen.emit(true);
    } else
      this.disabledClick.emit(!open);
  }

  keyDownEvent($event) {
    this.keydown.emit($event);
  }

  imgButtonClick() {
    this.imgClick.emit(true);
  }

  onNsiSelect($event) {

  }

  focus() {
    if (this.type === 'nsi')
      this.inputNsi.nativeElement.focus();
    else if (this.type === 'text')
      this.inputText.nativeElement.focus();
    else if (this.type === 'combo')
      this.inputCombo.nativeElement.focus();
    else if (this.type === 'date')
      this.inputDate.nativeElement.focus();
  }

  getPadding(value: string): string {
    if (value !== null) {
      if (this.paddingLen > 0 && this.padding.length > 0) {
        if (this.paddingLen > 32)
          this.paddingLen = 32;
        let _val = value.toString();
        while (_val.length < this.paddingLen)
          _val = this.padding + _val;
        return _val;
      }
    }
    return value;
  }

  getPadding2Zero(value: string): string {
    if (value !== null) {
        const _val = value.toString()
        return (_val.length < 2? '0' : '') + _val;
    }
    return value;
  }


  focusout() {
    this.value = this.getPadding(this.value);
  }

  hasFocus() {
    if (this.type === 'nsi')
      return this.inputNsi !== undefined && this.inputNsi.nativeElement === document.activeElement;
    else if (this.type === 'text')
      return this.inputText !== undefined && this.inputText.nativeElement === document.activeElement;
    else if (this.type === 'combo')
      return this.inputCombo !== undefined && this.inputCombo.nativeElement === document.activeElement;
    else if (this.type === 'date')
      return this.inputDate !== undefined && this.inputDate.nativeElement === document.activeElement;

    return false;
  }

  //-------------------------------------------------------------------------------------------------------------------
  // date/datetime

  calendarToggle() {
    this.datePicker.open();
  }

  // filter for days selecion in calendar
  dateFilter = (d: Date | null): boolean => {
    return true;
  };

  dateChange() {
    if (this.valid) {
      if (this.type === 'date') {
        this.valueChange.emit(this.dateValidator.getRawValue().format("DD.MM.YYYY"));
      } else {
        this.valueChange.emit(this.dateValidator.getRawValue().format("DD.MM.YYYY") + ' ' + this.getPadding2Zero(this._hours) + ':' + this.getPadding2Zero(this._minutes) + ':' + this.getPadding2Zero(this._seconds));
      }
    };
  }

  keyupHoursEvent($event) {
    if (this.valid && this._hours.length == 2)
      this.emit(this.dateValidator.getRawValue().dateValue.format("DD.MM.YYYY") + ' ' + this.getPadding2Zero(this._hours) + ':' + this.getPadding2Zero(this._minutes) + ':' + this.getPadding2Zero(this._seconds));
  }

  keyupMinutesEvent($event) {
    if (this.valid && this._minutes.length == 2)
      this.emit(this.dateValidator.getRawValue().format("DD.MM.YYYY") + ' ' + this.getPadding2Zero(this._hours) + ':' + this.getPadding2Zero(this._minutes) + ':' + this.getPadding2Zero(this._seconds));
  }

  keyupSecondsEvent($event) {
    if (this.valid && this._seconds.length == 2)
      this.emit(this.dateValidator.getRawValue().format("DD.MM.YYYY") + ' ' + this.getPadding2Zero(this._hours) + ':' + this.getPadding2Zero(this._minutes) + ':' + this.getPadding2Zero(this._seconds));
  }
}
