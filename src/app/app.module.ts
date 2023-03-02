import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule }   from '@angular/forms';



import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { BaseComponent } from './components/base/base.component';
import { SmgsComponent } from './components/smgs/smgs.component';
import { SmgsDetailComponent } from './components/smgs-detail/smgs-detail.component';
import { CimsmgsComponent } from './components/cimsmgs/cimsmgs.component';
import { TabNavigatorComponent } from './components/tab-navigator/tab-navigator.component';
import { InputComponent } from './components/UI/input/input.component';


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
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
