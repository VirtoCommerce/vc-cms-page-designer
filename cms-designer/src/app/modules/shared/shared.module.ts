import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrModule } from 'ngx-toastr';

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
        DragDropModule,
        ColorPickerModule,
        CKEditorModule,
        ToastrModule.forRoot()
    ],
    exports: [...COMPONENTS, ...LAYOUT_COMPONENTS]
})
export class SharedModule { }
