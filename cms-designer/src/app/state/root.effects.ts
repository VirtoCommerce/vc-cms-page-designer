import { UpdateDraftSuccess } from './../modules/theme/state/theme.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMapTo, debounceTime, distinctUntilChanged, withLatestFrom, tap, filter, map, switchMap } from 'rxjs/operators';
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
        withLatestFrom(this.editorStore$),
        tap(([_, store]) => this.preview.reload(store.editor.secondaryFrameId))
    );

    // editor

    @Effect({ dispatch: false })
    sendPreviewPageItem$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItem>(editorActions.EditorActionTypes.PreviewPageItem),
        map(action => action.payload),
        withLatestFrom(this.editorStore$),
        tap(([item, store]) => this.preview.addOrUpdateBlock(item, store.editor.primaryFrameId))
    );

    @Effect({ dispatch: false })
    sendNewBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.AddPageItem>(editorActions.EditorActionTypes.AddPageItem),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => {
            if (!action.payload.id) {
                action.payload.id = Math.max(...store.editor.page.map(v => <number>v.id || 0)) + 1;
            }
            this.preview.addOrUpdateBlock(action.payload, store.editor.primaryFrameId);
        })
    );

    @Effect({ dispatch: false })
    scrollPreviewToObject$ = this.actions$.pipe(
        ofType<editorActions.SelectPageItem>(editorActions.EditorActionTypes.SelectPageItem),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => this.preview.scrollTo(action.payload, store.editor.primaryFrameId))
    );

    @Effect({ dispatch: false })
    sendUpdatedBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.UpdateBlockPreview>(editorActions.EditorActionTypes.UpdateBlockPreview),
        filter(action => action.payload.type !== 'settings'),
        debounceTime(500),
        distinctUntilChanged(),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => this.preview.addOrUpdateBlock(
            { ...store.editor.currentSectionItem, ...action.payload },
            store.editor.primaryFrameId
        ))
    );

    @Effect({ dispatch: false })
    sendBlocksOrderChanged$ = this.actions$.pipe(
        ofType<editorActions.OrderChanged>(editorActions.EditorActionTypes.OrderChanged),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) =>
            this.preview.changeOrder(action.payload.currentIndex, action.payload.newIndex, store.editor.primaryFrameId))
    );

    @Effect({ dispatch: false })
    sendRemoveBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.RemovePageItem>(editorActions.EditorActionTypes.RemovePageItem),
        filter(action => action.payload.type !== 'settings'),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => this.preview.removeBlock(action.payload, store.editor.primaryFrameId))
    );

    @Effect()
    reloadPageInBackground$ = this.actions$.pipe(
        ofType(
            editorActions.EditorActionTypes.LoadPageSuccess,
            editorActions.EditorActionTypes.ClearPageChanges
        ),
        withLatestFrom(this.editorStore$),
        switchMap(([_, store]) => of(new editorActions.PreviewReady(store.editor.secondaryFrameId)))
    );

    @Effect()
    sendPageToStore$ = this.actions$.pipe(
        ofType<editorActions.PreviewReady>(editorActions.EditorActionTypes.PreviewReady),
        withLatestFrom(this.editorStore$, this.themeStore$),
        filter(([action, editorStore, themeStore]) =>
            editorStore.editor.previewIsReady && themeStore.theme.draftUploaded),
        switchMap(([_, editorStore, themeStore]) => {
            this.preview.page(editorStore.editor.page, editorStore.editor.secondaryFrameId);
            return of(new editorActions.ToggleFrames());
        })
    );

    @Effect({ dispatch: false })
    toggleFrames$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.ToggleFrames),
        withLatestFrom(this.editorStore$),
        tap(([_, store]) => this.preview.toggleFrames(store.editor.secondaryFrameId, store.editor.primaryFrameId))
    );

}
