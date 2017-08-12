import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from "./calendar.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [CalendarService],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule { }
