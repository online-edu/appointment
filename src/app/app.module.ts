import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { PubNubAngular } from "pubnub-angular2";
import 'hammerjs';

import { CoreModule } from "./core/core.module";
import { CalendarModule } from "./calendar/calendar.module";
import { AppComponent } from './app.component';
import { RestApi } from "./shared/services/rest-api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    CalendarModule
  ],
  providers: [RestApi, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
