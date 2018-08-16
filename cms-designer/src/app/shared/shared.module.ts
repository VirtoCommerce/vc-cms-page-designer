import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { TabsComponent } from './controls/tabs/tabs.component';
import { TabComponent } from './controls/tabs/tab.component';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';

const components = [
    TabsComponent,
    TabComponent,
    ColorPickerComponent
];

@NgModule({
    declarations: components,
    imports: [
        BrowserModule,
        FormsModule,
        ColorPickerModule
    ],
    exports: components
})
export class SharedModule { }
