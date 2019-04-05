import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
    mergeMap,
    map,
    catchError,
    withLatestFrom,
    switchMap,
    debounceTime,
    distinctUntilChanged,
    switchMapTo,
    tap
} from 'rxjs/operators';

import { MessageService } from '@shared/services';
import { ThemeService } from '@themes/services';
import * as themeActions from './theme.actions';
import * as fromTheme from '.';

@Injectable()
export class ThemeEffects {
    constructor(private themeService: ThemeService,
        private actions$: Actions,
        private messages: MessageService,
        private store$: Store<fromTheme.State>) { }

    @Effect()
    loadPresets$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.LoadThemes>(themeActions.ThemeActionTypes.LoadThemes),
        mergeMap(() =>
            this.themeService.loadPresets().pipe(
                map(data => new themeActions.LoadThemesSuccess(data)),
                catchError(error => of(new themeActions.LoadThemesFail(error)))
            )
        )
    );

    @Effect()
    loadSchema$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.LoadSchema>(themeActions.ThemeActionTypes.LoadSchema),
        mergeMap(() =>
            this.themeService.loadSchema().pipe(
                map(data => new themeActions.LoadSchemaSuccess(data)),
                catchError(error => of(new themeActions.LoadSchemaFail(error)))
            )
        )
    );

    @Effect()
    uploadPresets$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.SaveTheme>(themeActions.ThemeActionTypes.SaveTheme),
        withLatestFrom(this.store$.select(fromTheme.getPresets)),
        switchMap(([, theme]) =>
            this.themeService.uploadPresets(theme).pipe(
                map(() => new themeActions.SaveThemeSuccess()),
                catchError(err => of(new themeActions.SaveThemeFail(err)))
            )
        )
    );

    @Effect()
    uploadPreviewPreset$: Observable<Action> = this.actions$.pipe(
        ofType(
            themeActions.ThemeActionTypes.UpdateTheme,
            themeActions.ThemeActionTypes.SelectPreset,
            themeActions.ThemeActionTypes.LoadThemesSuccess,
            themeActions.ThemeActionTypes.ClearThemeChanges,
            themeActions.ThemeActionTypes.CancelPreset,
            themeActions.ThemeActionTypes.ApplyPreset),
        debounceTime(2000),
        distinctUntilChanged(),
        switchMapTo([new themeActions.UpdateDraft()])
    );

    @Effect()
    updateDraft$: Observable<Action> = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.UpdateDraft),
        withLatestFrom(this.store$.select(fromTheme.getPresets)),
        switchMap(([, theme]) =>
            this.themeService.uploadDraft(theme).pipe(
                map(() => new themeActions.UpdateDraftSuccess()),
                catchError(error => of(new themeActions.UpdateDraftFail(error)))
            )
        )
    );

    @Effect({dispatch: false})
    uploadError$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.SaveThemeFail>(themeActions.ThemeActionTypes.SaveThemeFail),
        tap((action: themeActions.SaveThemeFail) => {
            this.messages.displayError('Couldn\'t save theme', action.payload);
        })
    );

    @Effect({dispatch: false})
    uploadDraftError$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.UpdateDraftFail>(themeActions.ThemeActionTypes.UpdateDraftFail),
        tap((action: themeActions.UpdateDraftFail) => {
            this.messages.displayError('Couldn\'t connect server', action.payload);
        })
    );

    @Effect({ dispatch: false })
    uploadDraftSuccess$: Observable<Action> = this.actions$.pipe(
        ofType<themeActions.UpdateDraftSuccess>(themeActions.ThemeActionTypes.SaveThemeSuccess),
        tap((action: themeActions.UpdateDraftSuccess) => {
            this.messages.displayMessage('Theme saved successfully');
        })
    );
}
