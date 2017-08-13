import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent } from './calendar.component';
import { MaterialModule } from "../core/material-module";
import { DialogComponent } from './week/dialog/dialog.component';
import { WeekComponent } from './week/week.component';

@NgModule({
  imports: [
    CalendarRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  providers: [],
  declarations: [CalendarComponent, DialogComponent, WeekComponent],
  entryComponents: [DialogComponent]  
})
export class CalendarModule { }
