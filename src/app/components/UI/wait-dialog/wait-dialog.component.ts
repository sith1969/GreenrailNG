import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.scss']
})
export class WaitDialogComponent implements OnInit {

  spinnerVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

}
