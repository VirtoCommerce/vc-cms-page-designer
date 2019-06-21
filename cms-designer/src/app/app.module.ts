import { MockPreviewService } from './services/preview-mock.service';
import { MockPlatformService } from './services/platform-mock.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BsDropdownModule } from 'ngx-bootstrap';

import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@editor/editor.module';
import { ThemeModule } from '@themes/theme.module';

import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
// import { PreviewComponent } from './components/preview/preview.component';
// import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { PlatformService } from 'src/app/services/platform.service';

import { ErrorsEffects } from './store/errors.effects';
import { RootEffects } from './store/root.effects';
import { reducer } from './store/root.reducer';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppHttpInterceptor, ApiUrlsService, PreviewService, WindowRef } from '@app/services';
import { LoadingComponent } from './components/loading/loading.component';
import { RefreshTokenInterceptor } from './services/refresh-token.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        ...COMPONENTS,
        LoadingComponent
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
        BsDropdownModule.forRoot(),

        EditorModule,
        SharedModule,
        ThemeModule
    ],
    providers: [
        CookieService,
        // { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: (platform: PlatformService) =>
                () => platform.initSettings(),
            deps: [PlatformService],
            multi: true
        },
        {
            provide: PlatformService,
            useFactory: (http: HttpClient, urls: ApiUrlsService, windowRef: WindowRef) => {
                return new PlatformService(http, urls, windowRef);
            },
            deps: [ HttpClient, ApiUrlsService, WindowRef ]
        },
        {
            provide: PreviewService,
            useFactory: () => {
                return new PreviewService();
            },
            deps: [ ]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
