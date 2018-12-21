import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs/operators';

import { ErrorsService } from './../modules/shared/services/errors.service';

import * as themeActions from '../modules/theme/state/theme.actions';
import * as editorActions from '../modules/editor/state/editor.actions';

@Injectable()
export class ErrorsEffects {
    constructor(private actions$: Actions, private errors: ErrorsService) { }

    @Effect({ dispatch: false })
    loadBlocksSchemaFail$ = this.actions$.pipe(
        ofType(
            editorActions.EditorActionTypes.BlocksSchemaFail,
            editorActions.EditorActionTypes.LoadPageFail,
            themeActions.ThemeActionTypes.LoadThemesFail,
            themeActions.ThemeActionTypes.LoadSchemaFail
        ),
        map((action: any) => <HttpErrorResponse>action.payload),
        filter(response => response.status >= 400), // server or request error
        tap(response => this.errors.displayMessage(response.error.error.message, response))
    );
}
