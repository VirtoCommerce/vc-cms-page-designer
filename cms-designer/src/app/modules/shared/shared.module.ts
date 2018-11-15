import { BlockFormComponent } from './components/block-form/block-form.component';
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
    NumberItemComponent,

    TabsComponent,
    TabComponent,
    AccordeonComponent,
    AccItemComponent,
    SectionIconDirective
} from './components';

import { ControlHolderComponent } from './components/control-holder.component';
import { ControlHostDirective } from './components/control-host.directive';

import {
    DraggableDirective,
    DraggableHelperDirective,
    SortableListDirective
} from './draggable';

const CONTROLS = [
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    TextItemComponent,
    StringItemComponent,
    NumberItemComponent
];

const COMPONENTS = [
    ...CONTROLS,

    TabsComponent,
    TabComponent,
    AccordeonComponent,
    AccItemComponent,
    SectionIconDirective,
    ControlHolderComponent,
    BlockFormComponent,

    DraggableDirective,
    DraggableHelperDirective,
    SortableListDirective
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ControlHostDirective
    ],
    entryComponents: [...CONTROLS],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ColorPickerModule,
        QuillModule
    ],
    exports: COMPONENTS
})
export class SharedModule { }
