import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import {
    Headers, BaseRequestOptions,
    Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RestApi } from "../shared/services/rest-api"
import { CoreModule } from "../core/core.module";
import { CalendarComponent } from './calendar.component'
import { WeekComponent } from "./week/week.component";
import { LoggerService } from "../core/logger.service";
import { AppointmentService } from "./week/appointment/appointment.service";
import { PubnubService } from "../shared/services/pubnub.service";
import { PubNubAngular } from "pubnub-angular2";
import { UtilService } from "./week/shared/util.service";

describe('CalendarComponent', () => {

    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CalendarComponent, WeekComponent
            ],
            imports: [RouterTestingModule, CoreModule],
            providers: [AppointmentService, PubnubService, UtilService, PubNubAngular, RestApi, LoggerService, MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the calender view', async(() => {
        const fixture = TestBed.createComponent(CalendarComponent);
        const calendar = fixture.debugElement.componentInstance;
        expect(calendar).toBeTruthy();
    }));

    it('should render app-week element', async(() => {
        const fixture = TestBed.createComponent(CalendarComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-week')).toBeDefined();
    }));
});
