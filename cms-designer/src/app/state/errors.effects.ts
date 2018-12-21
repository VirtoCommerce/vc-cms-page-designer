import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { ErrorsService } from './../modules/shared/services/errors.service';

import * as themeActions from '../modules/theme/state/theme.actions';
import * as editorActions from '../modules/editor/state/editor.actions';

@Injectable()
export class ErrorsEffects {
    constructor(private actions$: Actions, private errors: ErrorsService) { }

    @Effect({ dispatch: false })
    loadBlocksSchemaFail$ = this.actions$.pipe(
        ofType<editorActions.BlocksSchemaFail>(editorActions.EditorActionTypes.BlocksSchemaFail),
        tap(action => this.errors.displayMessage(action.payload))
    );

    @Effect({ dispatch: false })
    loadPageFail$ = this.actions$.pipe(
        ofType<editorActions.LoadPageFail>(editorActions.EditorActionTypes.LoadPageFail),
        tap(action => this.errors.displayMessage(action.payload))
    );

    @Effect({ dispatch: false })
    loadThemeFail$ = this.actions$.pipe(
        ofType<themeActions.LoadThemesFail>(themeActions.ThemeActionTypes.LoadThemesFail),
        tap(action => this.errors.displayMessage(action.payload))
    );

    @Effect({ dispatch: false })
    loadThemeSchemaFail$ = this.actions$.pipe(
        ofType<themeActions.LoadSchemaFail>(themeActions.ThemeActionTypes.LoadSchemaFail),
        tap(action => this.errors.displayMessage(action.payload))
    );
}
