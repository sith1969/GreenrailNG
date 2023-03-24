import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatMenuModule} from '@angular/material/menu';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule} from '@angular/material/divider'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';


import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { BaseComponent } from './components/base/base.component';
import { SmgsComponent } from './components/smgs/smgs.component';
import { SmgsDetailComponent } from './components/smgs-detail/smgs-detail.component';
import { CimsmgsComponent } from './components/cimsmgs/cimsmgs.component';
import { TabNavigatorComponent } from './components/tab-navigator/tab-navigator.component';
import { InputComponent } from './components/UI/input/input.component';
import { WaitDialogComponent } from './components/UI/wait-dialog/wait-dialog.component';
import { SnackComponent } from './components/UI/snack/snack.component';
import { ShowMessageComponent } from './components/UI/show-message/show-message.component';
import { CimsmgsDetailComponent } from './components/cimsmgs-detail/cimsmgs-detail.component';
import { FastHelpComponent } from './components/fast-help/fast-help.component';
import { FloatingPanelComponent } from './components/floating-panel/floating-panel.component';

export const PredDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};


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
    WaitDialogComponent,
    SnackComponent,
    ShowMessageComponent,
    CimsmgsDetailComponent,
    FastHelpComponent,
    FloatingPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule,
    MatDividerModule,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule


  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },       // , MAT_MOMENT_DATE_ADAPTER_OPTIONS
    { provide: MAT_DATE_FORMATS, useValue: PredDateFormats },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
     DatePipe,
     {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
