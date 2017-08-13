import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: 'calendar', loadChildren: 'app/calendar/calendar.module#CalendarModule' },
    { path: '', redirectTo: '/calendar', pathMatch: 'full' }    
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }