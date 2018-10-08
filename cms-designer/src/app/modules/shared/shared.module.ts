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
    TextItemComponent,
    SliderItemComponent,

    TabsComponent,
    TabComponent,
    AccordeonComponent,
    AccItemComponent,
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
    TextItemComponent,
    StringItemComponent,
    SliderItemComponent,

    TabsComponent,
    TabComponent,
    AccordeonComponent,
    AccItemComponent,
    SectionIconDirective,

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
