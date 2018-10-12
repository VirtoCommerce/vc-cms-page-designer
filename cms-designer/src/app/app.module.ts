import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './modules/shared/shared.module';
import { EditorModule } from './modules/editor/editor.module';
import { ThemeModule } from './modules/theme/theme.module';

import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PreviewModeButtonComponent } from './components/preview-mode-button/preview-mode-button.component';

import { RootEffects } from './state/root.effects';
import { reducer } from './state/root.reducer';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        PreviewComponent,
        ToolbarComponent,
        SidebarComponent,
        PreviewModeButtonComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({
            'root': reducer
        }),
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
        EffectsModule.forRoot([RootEffects]),

        EditorModule,
        SharedModule,
        ThemeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
