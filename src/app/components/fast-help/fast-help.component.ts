// import { MainService } from './../main.service';
// import { PredService } from './../pred.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-fast-help',
  templateUrl: './fast-help.component.html',
  styleUrls: ['./fast-help.component.scss']
})
export class FastHelpComponent implements OnInit {

  showHelp = false;

  constructor(
    public mainService: MainService
    // public predService: PredService
    )
     {

    }

  ngOnInit(): void {
  }

}
