import { AppSettings } from './../services/app.settings';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, fromEvent, timer } from 'rxjs';
import {
    switchMapTo, debounceTime, distinctUntilChanged,
    withLatestFrom, tap, filter, map, switchMap, mapTo, timeout, catchError
} from 'rxjs/operators';
import { PreviewService, ApiUrlsService } from '@app/services';
import { MessageService } from '@shared/services';
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
        private errors: MessageService,
        private urls: ApiUrlsService,
        private rootStore$: Store<fromRoot.State>,
        private themeStore$: Store<fromTheme.State>,
        private editorStore$: Store<fromEditor.State>) { }

    @Effect()
    resetData$: Observable<Action> = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.ResetData),
        switchMapTo([
            new editorActions.ClearPageChanges(),
            // new themeActions.ClearThemeChanges()
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
        withLatestFrom(
            this.editorStore$.select(fromEditor.getPage),
            this.editorStore$.select(fromEditor.getPageNotLoaded)
        ),
        filter(([, page, pageNotLoaded]) => !page || pageNotLoaded),
        mapTo(new editorActions.LoadPage())
    );

    @Effect()
    switchToLoadBlocks$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(
            this.editorStore$.select(fromEditor.getBlocksSchema),
            this.editorStore$.select(fromEditor.getSchemaNotLoaded)
        ),
        filter(([, blocksSchema, schemaNotLoaded]) => !blocksSchema || schemaNotLoaded),
        mapTo(new editorActions.LoadBlockTypes())
    );

    @Effect()
    switchToLoadThemes$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(
            this.themeStore$.select(fromTheme.getPresets),
            this.themeStore$.select(fromTheme.getPresetsNotLoaded)
        ),
        filter(([, presets, presetsNotLoaded]) => !presets || presetsNotLoaded),
        mapTo(new themeActions.LoadThemes())
    );

    @Effect()
    switchToLoadThemeSchema$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.LoadData>(rootActions.RootActionTypes.LoadData),
        withLatestFrom(
            this.themeStore$.select(fromTheme.getSchema),
            this.themeStore$.select(fromTheme.getSchemaNotLoaded)
        ),
        filter(([, schema, schemaNotLoaded]) => !schema || schemaNotLoaded),
        mapTo(new themeActions.LoadSchema())
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$.pipe(
        ofType<rootActions.SaveData>(rootActions.RootActionTypes.SaveData),
        switchMapTo([
            new editorActions.SavePage(),
            new rootActions.ResetStorefrontCache()
            // new themeActions.SaveTheme()
        ])
    );

    @Effect({ dispatch: false })
    resetStorefrontCache = this.actions$.pipe(
        ofType<rootActions.ResetStorefrontCache>(rootActions.RootActionTypes.ResetStorefrontCache),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([, frameId]) => {
            this.preview.resetCache(frameId);
        })
    );

    @Effect()
    setPreviewUrl = this.actions$.pipe(
        ofType<editorActions.LoadPageSuccess>(editorActions.EditorActionTypes.LoadPageSuccess),
        switchMap(action => {
            if (!!action.payload.settings) {
                const result = this.urls.getStoreUrl(<string>action.payload.settings['layout']);
                return [new rootActions.SetPreviewUrl(result), new rootActions.ReloadPreview()];
            }
            return [new rootActions.SetPreviewUrl(null)];
        })
    );

    @Effect({ dispatch: false })
    previewFailed = this.actions$.pipe(
        ofType<rootActions.PreviewError>(rootActions.RootActionTypes.PreviewError),
        tap(action => {
            console.log(action.payload);
        })
    );

    @Effect()
    previewFailedByTimeout$ = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.CheckPreviewLoadedOrError),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryIsLoaded),
            this.rootStore$.select(fromRoot.getSecondaryIsLoaded),
            this.rootStore$.select(fromRoot.getPreviewLoading)
        ),
        filter(([, primaryLoaded, secondaryLoaded, isLoadingStill]) => (!primaryLoaded && !secondaryLoaded) || isLoadingStill),
        map(() => new rootActions.PreviewError('timeoutError'))
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
            return of(new rootActions.PreviewLoading(true, 'update draft success'));
        })
    );

    // editor

    @Effect({ dispatch: false })
    sendHoverToPreview$ = this.actions$.pipe(
        ofType<editorActions.HighlightInPreview>(editorActions.EditorActionTypes.HighlightInPreview),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.rootStore$.select(fromRoot.getPrimaryIsLoaded)
        ),
        tap(([action, frameId, previewReady]) => previewReady && this.preview.hover(action.payload, frameId))
    );

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
            this.preview.selectBlock(action.payload, frameId);
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
    timeoutToError$ = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.ReloadPreview),
        switchMap(() => timer(AppSettings.previewTimeout).pipe(
            map(() => new rootActions.CheckPreviewLoadedOrError())
        )),
        // timeout(AppSettings.previewTimeout),
        // map(() => of(new rootActions.)),
        // catchError(() => of(new rootActions.CheckPreviewLoadedOrError()))
    );

    @Effect()
    sendPageToStore$ = this.actions$.pipe(
        ofType<rootActions.PreviewReady>(rootActions.RootActionTypes.PreviewReady),
        withLatestFrom(
            this.editorStore$.select(fromEditor.getPageForEdit),
            this.rootStore$.select(fromRoot.getPrimaryIsLoaded),
            this.rootStore$.select(fromRoot.getSecondaryIsLoaded),
            this.rootStore$.select(fromRoot.getSecondaryFrameId),
            this.themeStore$.select(fromTheme.getDraftUploaded)
        ),
        filter(([action, page, primaryLoaded, secondaryLoaded, secondaryFrameId, draftUploaded]) =>
            primaryLoaded && secondaryLoaded
            && action.payload === secondaryFrameId
            && draftUploaded && page != null),
        switchMap(([action, page]) => {
            this.preview.page(page.content, action.payload);
            return of(new rootActions.PreviewLoading(true, 'preview ready'));
        })
    );

    @Effect({ dispatch: false })
    toggleFrames$ = this.actions$.pipe(
        ofType(rootActions.RootActionTypes.ToggleFrames),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.rootStore$.select(fromRoot.getSecondaryFrameId),
        ),
        map(([, primaryFrameId, secondaryFrameId]): [string, string] => [
            secondaryFrameId || primaryFrameId,
            primaryFrameId
        ]),
        tap(([primary, secondary]) => this.preview.toggleFrames(primary, secondary))
    );

    @Effect()
    openBlockEditorForPreview$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'select'),
        withLatestFrom(
            this.themeStore$.select(fromTheme.getCurrentThemeSchemaItem),
            this.themeStore$.select(fromTheme.getShowPresetsEditor)
        ),
        filter(([, schemaItem, showPresets]) => !schemaItem && !showPresets),
        switchMap(([data]) => {
            return [new editorActions.CompleteEditPageItem(), new editorActions.SelectPageItem(data.id)];
        }),
    );

    @Effect({ dispatch: false })
    deselectBlockInPreview$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'select'),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.themeStore$.select(fromTheme.getCurrentThemeSchemaItem),
            this.themeStore$.select(fromTheme.getShowPresetsEditor)
        ),
        filter(([, , schemaItem, showPresets]) => !!schemaItem || !!showPresets),
        tap(([, frameId]) => this.preview.selectBlock(0, frameId))
    );

    @Effect()
    reorderBlocksMessage$ = fromEvent(window, 'message').pipe(
        map((event: MessageEvent) => event.data),
        filter(data => data.type === 'move'),
        map(data => {
            return new editorActions.MoveBlock({ oldIndex: data.oldIndex, newIndex: data.newIndex });
        }),
    );

    // @Effect()
    // scriptInPreviewLoaded$ = fromEvent(window, 'message').pipe(
    //     filter((event: MessageEvent) => event.data.type === 'ping'), // first event
    //     map(event => {
    //         return new rootActions.PreviewReady(event.srcElement.id);
    //     }),
    // );

    @Effect()
    receiveSwapFrameMessage$ = fromEvent(window, 'message').pipe(
        filter((event: MessageEvent) => event.data.type === 'render-complete'),
        withLatestFrom(
            this.rootStore$.select(fromRoot.getPrimaryFrameId),
            this.rootStore$.select(fromRoot.getSecondaryFrameId)
        ),
        map(([event, primaryFrameId, secondaryFrameId]): [Window, Window, string, string] => [
            (<HTMLIFrameElement>document.getElementById(primaryFrameId)).contentWindow,
            <Window>event.source,
            primaryFrameId, secondaryFrameId
        ]),
        map(([primary, source, primaryFrameId, secondaryFrameId]) => primary === source ? primaryFrameId : secondaryFrameId),
        tap(x => console.log('toggle frames', x)),
        switchMap(loadedFrameId => [
            new rootActions.ToggleFrames(loadedFrameId),
            new rootActions.PreviewLoading(false, 'swap frames')
        ])
    );

    @Effect()
    receiveSwapBlocksMessage$ = fromEvent(window, 'message').pipe(
        filter((event: MessageEvent) => event.data.type === 'swap'),
        map(event => new editorActions.SwapBlocks({
            currentIndex: event.data.content.newIndex,
            previousIndex: event.data.content.currentIndex
        }))
    );

    @Effect()
    receiveHoverElementMessage$ = fromEvent(window, 'message').pipe(
        filter((event: MessageEvent) => event.data.type === 'hover'),
        map(event => new editorActions.MarkSectionHoveredInPreview(event.data.id))
    );

    @Effect({ dispatch: false })
    sendCloneToPreview$ = this.actions$.pipe(
        ofType<editorActions.ClonePageItem>(editorActions.EditorActionTypes.ClonePageItem),
        withLatestFrom(this.rootStore$.select(fromRoot.getPrimaryFrameId)),
        tap(([action, primaryFrameId]) => {
            this.preview.cloneBlock(action.payload.oldBlock.id, action.payload.newBlock.id, primaryFrameId);
        })
    );
}
