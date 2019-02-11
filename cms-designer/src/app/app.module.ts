import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from './modules/shared/shared.module';
import { EditorModule } from './modules/editor/editor.module';
import { ThemeModule } from './modules/theme/theme.module';

import { AppComponent } from './app.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { PlatformService } from 'src/app/services/platform.service';

import { ErrorsEffects } from './store/errors.effects';
import { RootEffects } from './store/root.effects';
import { reducer } from './store/root.reducer';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './services/app-http.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        PreviewComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
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
        EffectsModule.forRoot([RootEffects, ErrorsEffects]),

        EditorModule,
        SharedModule,
        ThemeModule
    ],
    providers: [
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: (platform: PlatformService) =>
                () => platform.initSettings(),
            deps: [PlatformService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
