import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from "./calendar.component";
import { WeekComponent } from "./week/week.component";

const calendarRoutes: Routes = [
    { path: '', component:CalendarComponent },
    { path: 'week', component: WeekComponent },
    { path: '', redirectTo: '/week', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forChild(calendarRoutes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }