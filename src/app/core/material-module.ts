import { CdkTableModule } from '@angular/cdk';
import { NgModule } from '@angular/core';
import {
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCoreModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdRippleModule,
    MdSelectModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';

@NgModule({
    exports: [
        CdkTableModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCoreModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdRippleModule,
        MdSelectModule,
        MdSnackBarModule,
        MdToolbarModule,
        MdTooltipModule
    ]
})
export class MaterialModule { }
