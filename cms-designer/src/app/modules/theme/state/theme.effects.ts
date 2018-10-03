import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ThemeService } from '../services/theme.service';
import { ThemeState } from './theme.reducer';
import * as themeActions from './theme.actions';
import * as fromTheme from '.';

@Injectable()
export class ThemeEffects {
    constructor(private themeService: ThemeService, private actions$: Actions, private store$: Store<ThemeState>) { }

    @Effect()
    loadPresets$: Observable<Action> = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.LoadPresets),
        mergeMap(action =>
            this.themeService.loadPresets().pipe(
                map(data => new themeActions.LoadPresetsSuccess(data)),
                catchError(err => of(new themeActions.LoadPresetsFail(err)))
            )
        )
    );

    @Effect()
    loadSchema$: Observable<Action> = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.LoadSchema),
        mergeMap(action =>
            this.themeService.loadSchema().pipe(
                map(data => new themeActions.LoadSchemaSuccess(data)),
                catchError(err => of(new themeActions.LoadSchemaFail(err)))
            )
        )
    );

}
