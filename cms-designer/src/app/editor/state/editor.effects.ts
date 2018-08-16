import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ThemeService } from '../services/theme.service';
import * as editorActions from './editor.actions';

@Injectable()
export class EditorEffects {
    constructor(private themeService: ThemeService, private actions$: Actions) { }

    @Effect()
    loadPresets$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadPresets),
        mergeMap(action =>
          this.themeService.loadPresets().pipe(
            map(data => new editorActions.LoadPresetsSuccess(data)),
            catchError(err => of(new editorActions.LoadPresetsFail(err)))
          )
        )
    );

    @Effect()
    loadSettings$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadSettings),
        mergeMap(action =>
          this.themeService.loadSettings().pipe(
            map(data => new editorActions.LoadSettingsSuccess(data)),
            catchError(err => of(new editorActions.LoadSettingsFail(err)))
          )
        )
    );
}
