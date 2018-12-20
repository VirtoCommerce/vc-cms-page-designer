import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, fromEvent } from 'rxjs';
import { switchMapTo, debounceTime, distinctUntilChanged, withLatestFrom, tap, filter, map, switchMap, mapTo } from 'rxjs/operators';
import { PreviewService } from '../services/preview.service';

import * as rootActions from './root.actions';
import * as fromRoot from '.';

import * as themeActions from '../modules/theme/state/theme.actions';
import * as fromTheme from '../modules/theme/state';

import * as editorActions from '../modules/editor/state/editor.actions';
import * as fromEditor from '../modules/editor/state';
import { BlockValuesModel } from '../modules/shared/models';
import { ErrorsService } from '../modules/shared/services/errors.service';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions,
        private preview: PreviewService,
        private errors: ErrorsService,
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
    switchToLoadPage$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(this.editorStore$.select(store => store.editor)),
        filter(([, state]) => !state.page || state.pageNotLoaded),
        mapTo(new editorActions.LoadPage())
    );

    @Effect()
    switchToLoadBlocks$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(this.editorStore$.select(store => store.editor)),
        filter(([, state]) => !state.blocksSchema || state.schemaNotLoaded),
        mapTo(new editorActions.LoadBlockTypes())
    );

    @Effect()
    switchToLoadThemes$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(this.themeStore$.select(store => store.theme)),
        filter(([, state]) => !state.presets || state.presetsNotLoaded),
        mapTo(new themeActions.LoadThemes())
    );

    @Effect()
    switchToLoadThemeSchema$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(this.themeStore$.select(store => store.theme)),
        filter(([, state]) => !state.schema || state.schemaNotLoaded),
        mapTo(new themeActions.LoadSchema())
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
        withLatestFrom(this.rootStore$.select(store => store.root)),
        switchMap(([, store]) => {
            this.preview.reload(store.secondaryFrameId);
            return of(new rootActions.PreviewLoading(true));
        })
    );

    // editor

    @Effect({ dispatch: false })
    sendPreviewPageItem$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItem>(editorActions.EditorActionTypes.PreviewPageItem),
        map(action => action.payload),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([item, store]) => this.preview.addOrUpdateBlock(item, store.primaryFrameId))
    );

    @Effect({ dispatch: false })
    sendNewBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.AddPageItem>(editorActions.EditorActionTypes.AddPageItem),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([action, store]) => {
            this.preview.addOrUpdateBlock(action.payload, store.primaryFrameId);
        })
    );

    @Effect({ dispatch: false })
    scrollPreviewToObject$ = this.actions$.pipe(
        ofType<editorActions.SelectPageItem>(editorActions.EditorActionTypes.SelectPageItem),
        filter(action => !!action.payload),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([action, store]) => {
            this.preview.selectBlock(<number>action.payload.id, store.primaryFrameId);
            if (action.scrollTo) {
                this.preview.scrollTo(action.payload, store.primaryFrameId);
            }
        })
    );

    @Effect({ dispatch: false })
    deselectObject$ = this.actions$.pipe(
        ofType<editorActions.CompleteEditPageItem>(editorActions.EditorActionTypes.CompleteEditPageItem),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([, store]) => {
            this.preview.selectBlock(0, store.primaryFrameId);
        })
    );

    @Effect({ dispatch: false })
    sendUpdatedBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.UpdateBlockPreview>(editorActions.EditorActionTypes.UpdateBlockPreview),
        withLatestFrom(this.rootStore$.select(store => store.root), this.editorStore$.select(store => store.editor)),
        map(([action, store, editor]): [BlockValuesModel, string] => [
            <BlockValuesModel>{ ...editor.currentSectionItem, ...action.payload },
            store.primaryFrameId
        ]),
        filter(([block]) => block.type !== 'settings'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(([block, frameId]) => this.preview.addOrUpdateBlock(block, frameId))
    );

    @Effect({ dispatch: false })
    sendBlocksOrderChanged$ = this.actions$.pipe(
        ofType<editorActions.OrderChanged>(editorActions.EditorActionTypes.OrderChanged),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([action, store]) =>
            this.preview.changeOrder(action.payload.currentIndex, action.payload.newIndex, store.primaryFrameId))
    );

    @Effect({ dispatch: false })
    sendRemoveBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.RemovePageItem>(editorActions.EditorActionTypes.RemovePageItem),
        filter(action => action.payload.type !== 'settings'),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([action, store]) => this.preview.removeBlock(action.payload, store.primaryFrameId))
    );

    @Effect()
    reloadPageInBackground$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadPageSuccess),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        switchMap(([, store]) => of(new rootActions.PreviewReady(store.secondaryFrameId)))
    );

    @Effect()
    sendPageToStore$ = this.actions$.pipe(
        ofType<rootActions.PreviewReady>(rootActions.RootActionTypes.PreviewReady),
        withLatestFrom(this.rootStore$, this.editorStore$, this.themeStore$),
        filter(([action, rootStore, editorStore, themeStore]) =>
            rootStore.root.primaryLoaded
            && rootStore.root.secondaryLoaded
            && action.payload === rootStore.root.secondaryFrameId
            && rootStore.root.secondaryLoaded
            && themeStore.theme.draftUploaded
            && editorStore.editor.page != null),
        switchMap(([action, rootStore, editorStore, themeStore]) => {
            this.preview.page(editorStore.editor.page.content, action.payload);
            return of(new rootActions.PreviewLoading(true));
        })
    );

    @Effect({ dispatch: false })
    toggleFrames$ = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.ToggleFrames),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        map(([, store]): [string, string] => [
            store.secondaryFrameId || store.primaryFrameId,
            store.primaryFrameId
        ]),
        tap(([primary, secondary]) => this.preview.toggleFrames(primary, secondary))
    );

    @Effect()
    openBlockEditorForPreview$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'open'),
        withLatestFrom(this.themeStore$, this.editorStore$),
        filter(([, themeStore]) => !themeStore.theme.selectedSchemaItem && !themeStore.theme.showPresetsEditor),
        map(([data, , editorStore]) => {
            const item = editorStore.editor.page.content.find(x => x.id === data.id);
            return new editorActions.SelectPageItem(item, false);
        }),
    );

    @Effect({ dispatch: false })
    deselectBlockInPreview$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'open'),
        withLatestFrom(this.themeStore$, this.rootStore$.select(x => x.root)),
        filter(([, themeStore]) => !!themeStore.theme.selectedSchemaItem || !!themeStore.theme.showPresetsEditor),
        map(([, , store]) => this.preview.selectBlock(0, store.primaryFrameId))
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
        withLatestFrom(this.rootStore$),
        map(([event, store]): [Window, Window, fromRoot.State] => [
            (<HTMLIFrameElement>document.getElementById(store.root.primaryFrameId)).contentWindow,
            <Window>event.source,
            store
        ]),
        map(([primary, source, state]) => primary === source ? state.root.primaryFrameId : state.root.secondaryFrameId),
        switchMap(loadedFrameId => [
            new rootActions.ToggleFrames(loadedFrameId),
            new rootActions.PreviewLoading(false)
        ])
    );

    @Effect({ dispatch: false })
    sendCloneToPreview$ = this.actions$.pipe(
        ofType<editorActions.ClonePageItem>(editorActions.EditorActionTypes.ClonePageItem),
        withLatestFrom(this.rootStore$.select(store => store.root)),
        tap(([action, store]) => {
            this.preview.cloneBlock(<number>action.payload.oldBlock.id, <number>action.payload.newBlock.id, store.primaryFrameId);
        })
    );

    @Effect({ dispatch: false })
    loadBlocksSchemaFail$ = this.actions$.pipe(
        ofType<editorActions.BlocksSchemaFail>(editorActions.EditorActionTypes.BlocksSchemaFail),
        tap(action => this.errors.displayMessage(action.payload))
    );

    @Effect({ dispatch: false })
    loadPageFail$ = this.actions$.pipe(
        ofType<editorActions.LoadPageFail>(editorActions.EditorActionTypes.LoadPageFail),
        tap(action => this.errors.displayMessage(action.payload))
    );
}
