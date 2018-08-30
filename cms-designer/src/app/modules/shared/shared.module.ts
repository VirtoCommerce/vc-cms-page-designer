import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import {
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    StringItemComponent,
    TabsComponent,
    TabComponent,
    TextItemComponent,
    SectionIconDirective

} from './components/index';

const COMPONENTS = [
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    TabsComponent,
    TabComponent,
    TextItemComponent,
    StringItemComponent,
    SectionIconDirective
];

// const EDITOR_COMPONENTS = [SettingsEditorComponent, SimpleTextComponent, ImageCarouselComponent];
// entryComponents: [...EDITOR_COMPONENTS],

@NgModule({
    declarations: COMPONENTS,
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        ColorPickerModule
    ],
    exports: COMPONENTS
})
export class SharedModule { }
