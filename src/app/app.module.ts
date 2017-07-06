import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { NgProgressModule } from 'ng2-progressbar';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgProgressModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJEMOMwH4cyWKY2nL-GiJBaecjhwUvVdw',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
