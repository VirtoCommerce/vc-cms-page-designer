import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './modules/shared/shared.module';
import { EditorModule } from './modules/editor/editor.module';
import { ThemeModule } from './modules/theme/theme.module';

import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        PreviewComponent,
        ToolbarComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'CMS',
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]),

        EditorModule,
        SharedModule,
        ThemeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
