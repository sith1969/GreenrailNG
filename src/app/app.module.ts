import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule }   from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatMenuModule} from '@angular/material/menu';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';



import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { BaseComponent } from './components/base/base.component';
import { SmgsComponent } from './components/smgs/smgs.component';
import { SmgsDetailComponent } from './components/smgs-detail/smgs-detail.component';
import { CimsmgsComponent } from './components/cimsmgs/cimsmgs.component';
import { TabNavigatorComponent } from './components/tab-navigator/tab-navigator.component';
import { InputComponent } from './components/UI/input/input.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { WaitDialogComponent } from './components/UI/wait-dialog/wait-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    SmgsComponent,
    SmgsDetailComponent,
    CimsmgsComponent,
    TabNavigatorComponent,
    InputComponent,
    WaitDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule


  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },       // , MAT_MOMENT_DATE_ADAPTER_OPTIONS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
