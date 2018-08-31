import {ApplicationRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {createNewHosts, removeNgStyles} from '@angularclass/hmr';

import {AppRoutingModule} from './app-routing.module';
import {AngularModule, MaterialsModule} from './vendors';

import {AppComp} from './app.comp';
import {FormsOverviewComp} from './components/formsOverview/formsOverview.comp';
import {BusinessFormComp} from './components/businessForm/businessForm.comp';
import {SchemaLoaderComp} from './components/schemaLoader/schemaLoader.comp';
import {BusinessFormItemComp} from './components/businessFormItem/businessFormItem.comp';

import {JsonSchemaService} from './services/jsonSchema.service';
import {BusinessFormService} from './services/businessForm.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularModule,
    MaterialsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComp,
    FormsOverviewComp,
    BusinessFormComp,
    BusinessFormItemComp,
    SchemaLoaderComp
  ],
  bootstrap: [AppComp],
  providers: [JsonSchemaService, BusinessFormService]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  public hmrOnInit(store) {
    if (!store) return;
    this.appRef.tick();
  }

  public hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
