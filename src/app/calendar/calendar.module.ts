import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "../core/material-module";

import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent } from './calendar.component';
import { DialogComponent } from './week/dialog/dialog.component';
import { WeekComponent } from './week/week.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarRoutingModule
  ],
  providers: [],
  declarations: [CalendarComponent, DialogComponent, WeekComponent],
  entryComponents: [DialogComponent],
  exports: [CalendarComponent]
})
export class CalendarModule { }
