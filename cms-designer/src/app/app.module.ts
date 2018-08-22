import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// import { NgxEditorModule } from 'ngx-editor';

import { EditorModule } from './editor/editor.module';

import { AppComponent } from './app.component';
import { PreviewComponent } from './shared/components/preview/preview.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        PreviewComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
        EditorModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'CMS',
            maxAge: 25,
            logOnly: environment.production,
        }),
        // NgxEditorModule,
        EffectsModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
