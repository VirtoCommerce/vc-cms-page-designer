import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, fromEvent } from 'rxjs';
import { switchMapTo, debounceTime, distinctUntilChanged, withLatestFrom, tap, filter, map, switchMap, mapTo } from 'rxjs/operators';
import { PreviewService, ApiUrlsService } from '@app/services';
import { ErrorsService } from '@shared/services';
import { BlockValuesModel } from '@shared/models';

import * as rootActions from './root.actions';
import * as fromRoot from '.';

import * as themeActions from '@themes/store/theme.actions';
import * as fromTheme from '@themes/store';

import * as editorActions from '@editor/store/editor.actions';
import * as fromEditor from '@editor/store';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions,
        private preview: PreviewService,
        private errors: ErrorsService,
        private urls: ApiUrlsService,
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
    closeEditors$: Observable<Action> = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.CloseEditors),
        switchMapTo([
            new editorActions.CloseEditors(),
            new themeActions.CloseEditors()
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

    @Effect()
    setPreviewUrl = this.actions$.pipe(
        ofType<editorActions.LoadPageSuccess>(editorActions.EditorActionTypes.LoadPageSuccess),
        map(action => {
            if (!!action.payload.settings) {
                const result = this.urls.getStoreUrl(<string>action.payload.settings['layout']);
                return new rootActions.SetPreviewUrl(result);
            }
            return new rootActions.SetPreviewUrl(null);
        })
    );

    // themes

    @Effect()
    uploadPreviewPreset$ = this.actions$.pipe(
        ofType(themeActions.ThemeActionTypes.UpdateDraftSuccess),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getSecondaryFrameId),
            this.rootStore$.select(fromRoot.getSecondaryIsLoaded)
        ),
        switchMap(([, frameId, previewReady]) => {
            if (previewReady) {
                this.preview.reload(frameId);
            }
            return of(new rootActions.PreviewLoading(true));
        })
    );

    // editor

    @Effect({ dispatch: false })
    sendPreviewPageItem$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItem>(editorActions.EditorActionTypes.PreviewPageItem),
        map(action => action.payload),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.rootStore$.select(fromRoot.getPrimaryIsLoaded)
        ),
        tap(([item, frameId, previewReady]) => previewReady && this.preview.preview(item, frameId)));

    @Effect({ dispatch: false })
    sendNewBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.AddPageItem>(editorActions.EditorActionTypes.AddPageItem),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.rootStore$.select(fromRoot.getPrimaryIsLoaded)
        ),
        tap(([action, frameId, previewReady]) => previewReady && this.preview.add(action.payload, frameId))
    );

    @Effect({ dispatch: false })
    scrollPreviewToObject$ = this.actions$.pipe(
        ofType<editorActions.SelectPageItem>(editorActions.EditorActionTypes.SelectPageItem),
        filter(action => !!action.payload),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([action, frameId]) => {
            this.preview.selectBlock(<number>action.payload.id, frameId);
            if (action.scrollTo) {
                this.preview.scrollTo(action.payload, frameId);
            }
        })
    );

    @Effect({ dispatch: false })
    deselectObject$ = this.actions$.pipe(
        ofType<editorActions.CompleteEditPageItem>(editorActions.EditorActionTypes.CompleteEditPageItem),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([, frameId]) => {
            this.preview.selectBlock(0, frameId);
        })
    );

    @Effect({ dispatch: false })
    sendUpdatedBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.UpdateBlockPreview>(editorActions.EditorActionTypes.UpdateBlockPreview),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.rootStore$.select(fromRoot.getPrimaryIsLoaded),
            this.editorStore$.select(fromEditor.getCurrentSectionItem)
        ),
        filter(([, , previewReady]) => previewReady),
        map(([action, frameId, , currentItem]): [BlockValuesModel, string] => [
            <BlockValuesModel>{ ...currentItem, ...action.payload },
            frameId
        ]),
        filter(([block]) => block.type !== 'settings'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(([block, frameId]) => this.preview.update(block, frameId))
    );

    @Effect({ dispatch: false })
    sendBlocksOrderChanged$ = this.actions$.pipe(
        ofType<editorActions.OrderChanged>(editorActions.EditorActionTypes.OrderChanged),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([action, frameId]) =>
            this.preview.changeOrder(action.payload.previousIndex, action.payload.currentIndex, frameId))
    );

    @Effect({ dispatch: false })
    sendRemoveBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.RemovePageItem>(editorActions.EditorActionTypes.RemovePageItem),
        filter(action => action.payload.type !== 'settings'),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([action, frameId]) => this.preview.removeBlock(action.payload, frameId))
    );

    @Effect({ dispatch: false })
    toggleItemVisibility$ = this.actions$.pipe(
        ofType<editorActions.ToggleItemVisibility>(editorActions.EditorActionTypes.ToggleItemVisibility),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([action, frameId]) => {
            if (action.payload.hidden) {
                this.preview.hide(action.payload, frameId);
            } else {
                this.preview.show(action.payload, frameId);
            }
        })
    );

    @Effect()
    reloadPageInBackground$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadPageSuccess),
        withLatestFrom(this.rootStore$.select(fromRoot.getSecondaryFrameId)),
        switchMap(([, frameId]) => of(new rootActions.PreviewReady(frameId)))
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
}
