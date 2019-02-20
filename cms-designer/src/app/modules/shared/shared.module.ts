import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';
@NgModule({
    declarations: [
        ...COMPONENTS,
        ...CONTROLS
    ],
    entryComponents: [...CONTROLS],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        QuillModule
    ],
    exports: COMPONENTS
})
export class SharedModule { }
