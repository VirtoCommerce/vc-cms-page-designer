import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeEditorComponent } from './components/theme-editor/theme-editor.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';

import { ThemeService } from './services/theme.service';
import { PageService } from './services/page.service';
import { TabsComponent } from './controls/tabs/tabs.component';
import { TabComponent } from './controls/tabs/tab.component';
import { ThemeItemEditorComponent } from './components/theme-editor/theme-item-editor.component';
import { PresetsEditorComponent } from './components/presets-editor/presets-editor.component';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { SelectItemComponent } from './controls/select-item/select-item.component';
import { CheckboxItemComponent } from './controls/checkbox-item/checkbox-item.component';
import { ImageItemComponent } from './controls/image-item/image-item.component';
import { TextItemComponent } from './controls/text-item/text-item.component';
import { ColorItemComponent } from './controls/color-item/color-item.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        PreviewComponent,
        SidebarComponent,
        ThemeEditorComponent,
        PageEditorComponent,
        TabsComponent,
        TabComponent,
        ThemeItemEditorComponent,
        PresetsEditorComponent,
        ColorPickerComponent,
        SelectItemComponent,
        CheckboxItemComponent,
        ImageItemComponent,
        TextItemComponent,
        ColorItemComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ColorPickerModule
    ],
    providers: [
        ThemeService,
        PageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
