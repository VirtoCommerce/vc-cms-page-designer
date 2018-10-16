import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, merge } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    mergeMap,
    map,
    switchMap,
    tap,
    withLatestFrom
} from 'rxjs/operators';

import * as editorActions from './editor.actions';
import * as fromEditor from '.';

import { PagesService } from '../services/pages.service';
import { PageModel } from '../models/page.model';
import { PreviewService } from '../../../services/preview.service';
import { BlocksComponentFactory } from '../blocks/blocks-component.factory';

@Injectable()
export class EditorEffects {
    constructor(private pages: PagesService,
        private preview: PreviewService,
        private blockFactory: BlocksComponentFactory,
        private actions$: Actions, private store$: Store<fromEditor.State>) { }

    @Effect()
    loadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.LoadPage>(editorActions.EditorActionTypes.LoadPage),
        mergeMap(action =>
            this.pages.downloadPage(action.payload).pipe(
                map(data => {
                    const model = new PageModel();
                    model.sections = data.filter(x => x.type !== 'settings');
                    model.sections.forEach((x, index) => x.id = index + 1);
                    const settings = data.find(x => x.type === 'settings') || { type: 'settings' };
                    model.settings = settings;
                    return new editorActions.LoadPageSuccess(model);
                }),
                catchError(err => of(new editorActions.LoadPageFail(err)))
            )
        )
    );

    @Effect()
    uploadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.SavePage>(editorActions.EditorActionTypes.SavePage),
        withLatestFrom(this.store$.select(state => state.editor.page)),
        switchMap(([action, page]) =>
            this.pages.uploadPage([page.settings, ...page.sections], action.payload).pipe(
                map(result => new editorActions.SavePageSuccess()),
                catchError(err => of(new editorActions.SavePageFail(err)))
            )
        )
    );

    @Effect()
    loadBlockTypes$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadBlockTypes),
        mergeMap(_ =>
            of(new editorActions.BlockTypesLoaded(this.blockFactory.getComponentsDescriptors()))
        )
    );

    @Effect()
    createPageItemModelByType$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.CreatePageItem),
        map((action: editorActions.CreatePageItem) => action.payload),
        map(type => this.blockFactory.create(type)),
        mergeMap(item =>
            of(new editorActions.AddPageItem(item))
        )
    );

    @Effect({ dispatch: false })
    sendPreviewPageItem$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItem>(editorActions.EditorActionTypes.PreviewPageItem),
        map(action => action.payload),
        map(item => !!item ? this.blockFactory.createPreview(item.type) : null),
        tap(item => this.preview.addOrUpdateBlock(item))
    );

    @Effect({ dispatch: false })
    sendNewBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.AddPageItem>(editorActions.EditorActionTypes.AddPageItem),
        withLatestFrom(this.store$),
        tap(([action, store]) => {
            if (!action.payload.id) {
                action.payload.id = Math.max(...store.editor.page.sections.map(v => v.id || 0)) + 1;
            }
            this.preview.addOrUpdateBlock(action.payload);
        })
    );

    @Effect({ dispatch: false })
    sendUpdatedBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.UpdateBlockPreview>(editorActions.EditorActionTypes.UpdateBlockPreview),
        filter(action => action.payload.type !== 'settings'),
        debounceTime(500),
        distinctUntilChanged(),
        tap(action => {
            this.preview.addOrUpdateBlock(action.payload);
        })
    );

    @Effect({ dispatch: false })
    sendBlocksOrderChanged$ = this.actions$.pipe(
        ofType<editorActions.OrderChanged>(editorActions.EditorActionTypes.OrderChanged),
        tap(action => {
            this.preview.changeOrder(action.payload.currentIndex, action.payload.newIndex);
        })
    );

    @Effect({ dispatch: false })
    sendRemoveBlockToStoreLoaded$ = this.actions$.pipe(
        ofType<editorActions.RemovePageItem>(editorActions.EditorActionTypes.RemovePageItem),
        filter(action => action.payload.type !== 'settings'),
        tap(action => {
            this.preview.removeBlock(action.payload);
        })
    );

    @Effect({ dispatch: false })
    sendPageToStore$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadPageSuccess, editorActions.EditorActionTypes.PreviewReady),
        withLatestFrom(this.store$),
        tap(([_, state]) => {
            if (state.editor.previewIsReady) {
                this.preview.page(state.editor.page);
            }
        })
    );
}
