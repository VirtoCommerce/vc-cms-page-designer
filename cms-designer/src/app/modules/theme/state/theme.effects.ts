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
        ofType<themeActions.LoadThemes>(themeActions.ThemeActionTypes.LoadThemes),
        mergeMap(_ =>
            this.themeService.loadPresets().pipe(
                map(data => new themeActions.LoadThemesSuccess(data)),
                catchError(err => of(new themeActions.LoadThemesFail(err)))
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
        ofType<themeActions.SaveTheme>(themeActions.ThemeActionTypes.SaveTheme),
        withLatestFrom(this.store$.select(state => state.theme.presets)),
        switchMap(([_, theme]) =>
            this.themeService.uploadPresets(theme).pipe(
                map(() => new themeActions.SaveThemeSuccess()),
                catchError(err => of(new themeActions.SaveThemeFail(err)))
            )
        )
    );

    @Effect({ dispatch: false })
    uploadPreviewPreset$ = this.actions$.pipe(
        ofType(
            themeActions.ThemeActionTypes.UpdateTheme,
            themeActions.ThemeActionTypes.SelectPreset,
            themeActions.ThemeActionTypes.LoadThemesSuccess,
            themeActions.ThemeActionTypes.ClearThemeChanges,
            themeActions.ThemeActionTypes.CancelPreset,
            themeActions.ThemeActionTypes.ApplyPreset),
        debounceTime(2000),
        distinctUntilChanged(),
        withLatestFrom(this.store$.select(state => state.theme.presets)),
        tap(([_, theme]) => this.themeService.uploadDraft(theme).subscribe(() => this.preview.reload()))
    );
}
