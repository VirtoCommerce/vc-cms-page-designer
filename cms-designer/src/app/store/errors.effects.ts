import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs/operators';

import { MessageService } from '@shared/services';

import * as themeActions from '@themes/store/theme.actions';
import * as editorActions from '@editor/store/editor.actions';

@Injectable()
export class ErrorsEffects {
    constructor(private actions$: Actions, private errors: MessageService) { }

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
        tap(response => this.errors.displayError(response.error.exceptionMessage, response))
    );
}
