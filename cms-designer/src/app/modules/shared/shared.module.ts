import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import {
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    StringEditorComponent,
    TabsComponent,
    TabComponent,
    TextEditorComponent,
    TextItemComponent,
    SectionIconDirective

} from './components/index';

const COMPONENTS = [
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    SelectItemComponent,
    // StringEditorComponent,
    TabsComponent,
    TabComponent,
    // TextEditorComponent,
    TextItemComponent,
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
