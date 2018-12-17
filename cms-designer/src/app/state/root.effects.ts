import { UpdateDraftSuccess } from './../modules/theme/state/theme.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, fromEvent } from 'rxjs';
import { switchMapTo, debounceTime, distinctUntilChanged, withLatestFrom, tap, filter, map, switchMap } from 'rxjs/operators';
import { PreviewService } from '../services/preview.service';

import * as rootActions from './root.actions';
import * as fromRoot from '.';

import * as themeActions from '../modules/theme/state/theme.actions';
import * as fromTheme from '../modules/theme/state';

import * as editorActions from '../modules/editor/state/editor.actions';
import * as fromEditor from '../modules/editor/state';
import { BlockValuesModel } from '../modules/shared/models';

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

    @Effect()
    uploadPreviewPreset$ = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.UpdateDraftSuccess),
        withLatestFrom(this.editorStore$),
        switchMap(([_, store]) => {
            this.preview.reload(store.editor.secondaryFrameId);
            return of(new rootActions.PreviewLoading(true));
        })
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
                action.payload.id = Math.max(...store.editor.page.content.map(v => <number>v.id || 0)) + 1;
            }
            this.preview.addOrUpdateBlock(action.payload, store.editor.primaryFrameId);
        })
    );

    @Effect({ dispatch: false })
    scrollPreviewToObject$ = this.actions$.pipe(
        ofType<editorActions.SelectPageItem>(editorActions.EditorActionTypes.SelectPageItem),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => {
            this.preview.selectBlock(<number>action.payload.id, store.editor.primaryFrameId);
            if (action.scrollTo) {
                this.preview.scrollTo(action.payload, store.editor.primaryFrameId);
            }
        })
    );

    @Effect({ dispatch: false })
    deselectObject$ = this.actions$.pipe(
        ofType<editorActions.CompleteEditPageItem>(editorActions.EditorActionTypes.CompleteEditPageItem),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => {
            this.preview.selectBlock(0, store.editor.primaryFrameId);
        })
    );

    @Effect({ dispatch: false })
    sendUpdatedBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.UpdateBlockPreview>(editorActions.EditorActionTypes.UpdateBlockPreview),
        withLatestFrom(this.editorStore$),
        map(([action, store]): [BlockValuesModel, string] => [
            <BlockValuesModel>{ ...store.editor.currentSectionItem, ...action.payload },
            store.editor.primaryFrameId
        ]),
        filter(([block, _]) => block.type !== 'settings'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(([block, frameId]) => this.preview.addOrUpdateBlock(block, frameId))
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
            editorStore.editor.primaryLoaded
            && editorStore.editor.secondaryLoaded
            && themeStore.theme.draftUploaded
            && editorStore.editor.page != null),
        switchMap(([action, editorStore, themeStore]) => {
            this.preview.page(editorStore.editor.page.content, action.payload);
            return of(new rootActions.PreviewLoading(true));
        })
    );

    @Effect({ dispatch: false })
    toggleFrames$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.ToggleFrames),
        withLatestFrom(this.editorStore$),
        map(([_, store]): [string, string] => [
            store.editor.secondaryFrameId || store.editor.primaryFrameId,
            store.editor.primaryFrameId
        ]),
        tap(([primary, secondary]) => this.preview.toggleFrames(primary, secondary))
    );

    @Effect()
    receivePreviewMessage$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'open'),
        withLatestFrom(this.themeStore$, this.editorStore$),
        filter(([_, themeStore]) => !themeStore.theme.selectedSchemaItem && !themeStore.theme.showPresetsEditor),
        map(([data, _, editorStore]) => {
            const item = editorStore.editor.page.content.find(x => x.id === data.id);
            return new editorActions.SelectPageItem(item, false);
        }),
    );

    @Effect()
    reorderBlocksMessage$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'move'),
        map(data => {
            return new editorActions.MoveBlock({ oldIndex: data.oldIndex, newIndex: data.newIndex });
        }),
    );

    @Effect()
    receiveSwapMessage$ = fromEvent(window, 'message').pipe(
        filter((event: MessageEvent) => event.data.type === 'render-complete'),
        withLatestFrom(this.editorStore$),
        map(([event, editorStore]): [Window, Window, fromEditor.State] => [
            (<HTMLIFrameElement>document.getElementById(editorStore.editor.primaryFrameId)).contentWindow,
            <Window>event.source,
            editorStore
        ]),
        map(([primary, source, state]) => primary === source ? state.editor.primaryFrameId : state.editor.secondaryFrameId),
        switchMap(loadedFrameId => [
            new editorActions.ToggleFrames(loadedFrameId),
            new rootActions.PreviewLoading(false)
        ])
    );

    @Effect({ dispatch: false })
    sendCloneToPreview$ = this.actions$.pipe(
        ofType<editorActions.ClonePageItem>(editorActions.EditorActionTypes.ClonePageItem),
        withLatestFrom(this.editorStore$),
        tap(([action, store]) => {
            this.preview.cloneBlock(<number>action.payload.oldBlock.id, <number>action.payload.newBlock.id, store.editor.primaryFrameId);
        })
    );
}
