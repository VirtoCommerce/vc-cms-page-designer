import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';

import { LAYOUT_COMPONENTS } from './layouts';

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...CONTROLS,

        ...LAYOUT_COMPONENTS
    ],
    entryComponents: [...CONTROLS],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ColorPickerModule,
        QuillModule
    ],
    exports: [...COMPONENTS, ...LAYOUT_COMPONENTS]
})
export class SharedModule { }
