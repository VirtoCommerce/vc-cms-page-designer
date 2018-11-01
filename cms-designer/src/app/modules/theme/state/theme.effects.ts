import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ThemeService } from '../services/theme.service';
import { PreviewService } from 'src/app/services/preview.service';
import * as themeActions from './theme.actions';
import * as fromTheme from '.';

@Injectable()
export class ThemeEffects {
    constructor(private themeService: ThemeService,
        private preview: PreviewService,
        private actions$: Actions,
        private store$: Store<fromTheme.State>) { }

    @Effect()
    loadPresets$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.LoadPresets>(themeActions.ThemeActionTypes.LoadPresets),
        mergeMap(_ =>
            this.themeService.loadPresets().pipe(
                map(data => new themeActions.LoadPresetsSuccess(data)),
                catchError(err => of(new themeActions.LoadPresetsFail(err)))
            )
        )
    );

    @Effect()
    loadSchema$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.LoadSchema>(themeActions.ThemeActionTypes.LoadSchema),
        mergeMap(_ =>
            this.themeService.loadSchema().pipe(
                map(data => new themeActions.LoadSchemaSuccess(data)),
                catchError(err => of(new themeActions.LoadSchemaFail(err)))
            )
        )
    );

    @Effect()
    uploadPresets$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.SavePresets>(themeActions.ThemeActionTypes.SavePresets),
        withLatestFrom(this.store$.select(state => state.theme.presets)),
        switchMap(([_, theme]) =>
            this.themeService.uploadPresets(theme).pipe(
                map(() => new themeActions.SavePresetsSuccess()),
                catchError(err => of(new themeActions.SavePresetsFail(err)))
            )
        )
    );

    @Effect({ dispatch: false })
    uploadPreviewPreset$ = this.actions$.pipe(
        ofType(
            themeActions.ThemeActionTypes.UpdateTheme,
            themeActions.ThemeActionTypes.SelectPreset,
            themeActions.ThemeActionTypes.LoadPresetsSuccess,
            themeActions.ThemeActionTypes.ClearThemeChanges),
        debounceTime(2000),
        distinctUntilChanged(),
        withLatestFrom(this.store$.select(state => state.theme.presets)),
        tap(([_, presets]) => this.themeService.uploadDraft(presets).subscribe(() => this.preview.reload()))
    );
}
