import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BusinessFormComp} from './components/businessForm/businessForm.comp';
import {FormsOverviewComp} from './components/formsOverview/formsOverview.comp';

export const routes: Routes = [
  {path: 'business-form/:id', component: BusinessFormComp},
  {path: '', component: FormsOverviewComp},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
