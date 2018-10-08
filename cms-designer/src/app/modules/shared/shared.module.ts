import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill';

import {
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    StringItemComponent,
    TabsComponent,
    TabComponent,
    TextItemComponent,
    SliderItemComponent,
    SectionIconDirective
} from './components';

import {
    DraggableDirective,
    DraggableHelperDirective,
    SortableListDirective
} from './draggable';

const COMPONENTS = [
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    TabsComponent,
    TabComponent,
    TextItemComponent,
    StringItemComponent,
    SectionIconDirective,
    SliderItemComponent,

    DraggableDirective,
    DraggableHelperDirective,
    SortableListDirective
];

// const EDITOR_COMPONENTS = [SettingsEditorComponent, SimpleTextComponent, ImageCarouselComponent];
// entryComponents: [...EDITOR_COMPONENTS],

@NgModule({
    declarations: COMPONENTS,
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ColorPickerModule,
        QuillModule
    ],
    exports: COMPONENTS
})
export class SharedModule { }
