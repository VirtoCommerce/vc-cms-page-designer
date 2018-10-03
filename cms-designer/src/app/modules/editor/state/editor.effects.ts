import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';

import * as editorActions from './editor.actions';
import * as fromEditor from '.';

import { PageService } from '../services/page.service';
import { PageModel } from '../models/page.model';
import { PreviewService } from '../services/preview.service';
import { BlocksComponentFactory } from '../blocks/blocks-component.factory';

@Injectable()
export class EditorEffects {
    constructor(private pageService: PageService,
                private preview: PreviewService,
                private blockFactory: BlocksComponentFactory,
                private actions$: Actions, private store$: Store<fromEditor.State>) { }

    @Effect()
    loadPage$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadPage),
        mergeMap(_ =>
            this.pageService.loadPage().pipe(
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
    loadBlockTypes$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadBlockTypes),
        mergeMap(_ =>
            of(new editorActions.BlockTypesLoaded(this.pageService.availableTypes))
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
        ofType<editorActions.UpdatePageItem>(editorActions.EditorActionTypes.UpdatePageItem),
        tap(action => {
            this.preview.addOrUpdateBlock(action.payload);
        })
    );

    @Effect({ dispatch: false })
    sendPageToStoreWhenPageLoaded$ = this.actions$.pipe(
        ofType<editorActions.LoadPageSuccess>(editorActions.EditorActionTypes.LoadPageSuccess),
        withLatestFrom(this.store$),
        tap(([action, state]) => {
            if (state.editor.previewIsReady) {
                this.preview.page(action.payload);
            }
        })
    );

    // todo: combine with sendPageToStoreWhenPageLoaded$
    @Effect({ dispatch: false })
    sendPageToStoreWhenPreviewLoaded$ = this.actions$.pipe(
        ofType<editorActions.PreviewReady>(editorActions.EditorActionTypes.PreviewReady),
        withLatestFrom(this.store$),
        tap(([_, state]) => {
            this.preview.page(state.editor.page);
        })
    );

}
