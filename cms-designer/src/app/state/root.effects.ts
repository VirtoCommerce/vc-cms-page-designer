import { UpdateDraftSuccess } from './../modules/theme/state/theme.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMapTo, debounceTime, distinctUntilChanged, withLatestFrom, tap, filter, map } from 'rxjs/operators';
import { PreviewService } from '../services/preview.service';

import * as rootActions from './root.actions';
import * as fromRoot from '.';

import * as themeActions from '../modules/theme/state/theme.actions';
import * as fromTheme from '../modules/theme/state';

import * as editorActions from '../modules/editor/state/editor.actions';
import * as fromEditor from '../modules/editor/state';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions,
        private preview: PreviewService,
        private rootStore$: Store<fromRoot.State>,
        private themeStore$: Store<fromTheme.State>,
        private editorStore$: Store<fromEditor.State>) { }

    @Effect()
    resetData$: Observable<Action> = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.ResetData),
        switchMapTo([
            new editorActions.ClearPageChanges(),
            new themeActions.ClearThemeChanges()
        ])
    );

    @Effect()
    loadData$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        switchMapTo([
            new editorActions.LoadPage(),
            new themeActions.LoadThemes(),
            new themeActions.LoadSchema()
        ])
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.SaveData>(rootActions.RootActionTypes.SaveData),
        switchMapTo([
            new editorActions.SavePage(),
            new themeActions.SaveTheme()
        ])
    );

    // themes

    @Effect({ dispatch: false })
    uploadPreviewPreset$ = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.UpdateDraftSuccess),
        tap(() => this.preview.reload())
    );

    // editor

    @Effect({ dispatch: false })
    sendPreviewPageItem$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItem>(editorActions.EditorActionTypes.PreviewPageItem),
        map(action => action.payload),
        tap(item => this.preview.addOrUpdateBlock(item))
    );

    @Effect({ dispatch: false })
    sendNewBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.AddPageItem>(editorActions.EditorActionTypes.AddPageItem),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => {
            if (!action.payload.id) {
                action.payload.id = Math.max(...store.editor.page.sections.map(v => v.id || 0)) + 1;
            }
            this.preview.addOrUpdateBlock(action.payload);
        })
    );

    @Effect({ dispatch: false })
    scrollPreviewToObject$ = this.actions$.pipe(
        ofType<editorActions.SelectPageItem>(editorActions.EditorActionTypes.SelectPageItem),
        tap(action => this.preview.scrollTo(action.payload))
    );

    @Effect({ dispatch: false })
    sendUpdatedBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.UpdateBlockPreview>(editorActions.EditorActionTypes.UpdateBlockPreview),
        filter(action => action.payload.type !== 'settings'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(action => this.preview.addOrUpdateBlock(action.payload))
    );

    @Effect({ dispatch: false })
    sendBlocksOrderChanged$ = this.actions$.pipe(
        ofType<editorActions.OrderChanged>(editorActions.EditorActionTypes.OrderChanged),
        tap(action => this.preview.changeOrder(action.payload.currentIndex, action.payload.newIndex))
    );

    @Effect({ dispatch: false })
    sendRemoveBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.RemovePageItem>(editorActions.EditorActionTypes.RemovePageItem),
        filter(action => action.payload.type !== 'settings'),
        tap(action => this.preview.removeBlock(action.payload))
    );

    @Effect({ dispatch: false })
    sendPageToStore$ = this.actions$.pipe(
        ofType(
            editorActions.EditorActionTypes.LoadPageSuccess,
            editorActions.EditorActionTypes.PreviewReady,
            editorActions.EditorActionTypes.ClearPageChanges
        ),
        withLatestFrom(this.editorStore$, this.themeStore$),
        filter(([_, editorStore, themeStore]) => editorStore.editor.previewIsReady && themeStore.theme.draftUploaded),
        tap(([_, store]) => this.preview.page(store.editor.page))
    );

}
