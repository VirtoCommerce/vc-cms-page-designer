import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        PreviewComponent,
        SidebarComponent,
        ThemeEditorComponent,
        PageEditorComponent,
        TabsComponent,
        TabComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        ThemeService,
        PageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
