import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { LoggerService } from "./logger.service";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import { MaterialModule } from "./material-module";
import { NavComponent } from "./nav/nav.component";

const CommonModules = [MaterialModule];

@NgModule({
  imports: [
    CommonModule,
    ...CommonModules,
    HttpModule
  ],
  declarations: [NavComponent],
  exports: [...CommonModules, NavComponent],
  providers: [LoggerService]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
