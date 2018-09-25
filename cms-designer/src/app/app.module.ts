import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { DndModule } from 'ngx-drag-drop';

import { SharedModule } from './modules/shared/shared.module';
import { EditorModule } from './modules/editor/editor.module';
import { ThemeModule } from './modules/theme/theme.module';

import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { environment } from '../environments/environment';
import { EditorActionTypes } from './modules/editor/state/editor.actions';

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
            // actionSanitizer: (action: { type: string; payload?: any }, id: number): Action => {
            //             if (action.type === EditorActionTypes.PreviewReady) {
            //                 return { type: EditorActionTypes.PreviewReady };
            //             }
            //             return action;
            //         },
            // stateSanitizer: (state: any, id: number): any => {
            // }
        }),
        EffectsModule.forRoot([]),

        EditorModule,
        SharedModule,
        ThemeModule,

        DndModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
