import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom, tap, switchMap, concatMapTo } from 'rxjs/operators';

import * as rootActions from './root.actions';
import * as fromRoot from '.';

import * as themeActions from '../modules/theme/state/theme.actions';
import * as fromTheme from '../modules/theme/state';

import * as editorActions from '../modules/editor/state/editor.actions';
import * as fromEditor from '../modules/editor/state';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions, private store$: Store<fromRoot.State>) { }

    // @Effect()
    // loadPresets$: Observable<Action> = this.actions$.pipe(
    //     ofType(themeActions.ThemeActionTypes.LoadPresets),
    //     mergeMap(action =>
    //         this.themeService.loadPresets().pipe(
    //             map(data => new themeActions.LoadPresetsSuccess(data)),
    //             catchError(err => of(new themeActions.LoadPresetsFail(err)))
    //         )
    //     )
    // );

    @Effect()
    resetData$: Observable<Action> = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.ResetData),
        concatMapTo([
            new editorActions.ClearPageChanges(),
            new themeActions.ClearThemeChanges()
        ])
    );
}
