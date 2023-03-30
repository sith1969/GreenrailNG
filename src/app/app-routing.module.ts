import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { SmgsDetailComponent } from './components/smgs-detail/smgs-detail.component';
import { SmgsComponent } from './components/smgs/smgs.component';
import { CimsmgsComponent } from './components/cimsmgs/cimsmgs.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'smgs', component: SmgsComponent},
  {path: 'smgs/:id', component: SmgsDetailComponent},
  {path: 'cimsmgs', component: CimsmgsComponent},
  {path: 'invoice', component: InvoiceComponent},

  {path: '**', redirectTo:"", component: BaseComponent,pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
