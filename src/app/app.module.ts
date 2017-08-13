import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { PubNubAngular } from "pubnub-angular2";
import 'hammerjs';

import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
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
    AppRoutingModule
  ],
  providers: [RestApi, PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
