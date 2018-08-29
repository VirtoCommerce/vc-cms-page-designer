import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ThemeService } from '../services/theme.service';
import * as themeActions from './theme.actions';

@Injectable()
export class ThemeEffects {
    constructor(private themeService: ThemeService, private actions$: Actions) { }

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
    loadSettings$: Observable<Action> = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.LoadSettings),
        mergeMap(action =>
            this.themeService.loadSettings().pipe(
                map(data => new themeActions.LoadSettingsSuccess(data)),
                catchError(err => of(new themeActions.LoadSettingsFail(err)))
            )
        )
    );

}
