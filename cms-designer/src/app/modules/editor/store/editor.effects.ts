import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';
// import { CatalogService } from './../services/catalog.service';
import {
    catchError,
    mergeMap,
    switchMap,
    withLatestFrom
} from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MessageService } from '@shared/services';
import { BlockValuesModel } from '@shared/models';
import { PageModel } from '@editor/models';
import { BlocksService, PagesService } from '@editor/services';

import * as editorActions from './editor.actions';
import * as fromEditor from '.';

// import { CategoryModel } from '../models';

@Injectable()
export class EditorEffects {
    constructor(private pages: PagesService,
        // private catalog: CatalogService,
        private blocks: BlocksService,
        private messages: MessageService,
        private actions$: Actions, private store$: Store<fromEditor.State>) { }

    @Effect()
    convertPageTypeToPreviewSection$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItemOfType>(editorActions.EditorActionTypes.PreviewPageItemOfType),
        map(action => action.payload),
        map(blockSchema => {
            if (!!blockSchema) {
                const result = <BlockValuesModel>{};
                blockSchema.settings.forEach(x => result[x.id] = x['preview'] || x['default'] || null);
                result.type = blockSchema.type;
                return result;
            }
            return null;
        }),
        mergeMap(item =>
            of(new editorActions.PreviewPageItem(item))
        )
    );

    @Effect()
    closeEditors$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.CloseEditors),
        switchMapTo([
            new editorActions.CompleteEditPageItem(),
            new editorActions.PreviewPageItemOfType(null),
            new editorActions.ToggleNewBlockPane(false)
        ])
    );

    @Effect()
    copyBlock$ = this.actions$.pipe(
        ofType<editorActions.CopyPageItem>(editorActions.EditorActionTypes.CopyPageItem),
        withLatestFrom(this.store$.select(fromEditor.getPage)),
        map(([action, page]) => {
            const block = { ...action.payload };
            block.id = page.content.reduce((v: number, b: BlockValuesModel) => Math.max(<number>b.id, v), 0) + 1;
            return new editorActions.ClonePageItem({ oldBlock: action.payload, newBlock: block });
        })
    );

    @Effect()
    createPageItemModelByType$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.CreatePageItem),
        map((action: editorActions.CreatePageItem) => action.payload),
        withLatestFrom(this.store$.select(fromEditor.getPage)),
        map(([blockSchema, page]) => {
            const block = <BlockValuesModel>{
                id: page.content.length ? Math.max(...page.content.map(v => <number>v.id || 0)) + 1 : 1,
                type: blockSchema.type
            };
            blockSchema.settings.forEach(x => block[x.id] = x['default'] || null);
            return block;
        }),
        mergeMap(item =>
            of(new editorActions.AddPageItem(item))
        )
    );

    @Effect()
    loadBlockTypes$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadBlocksSchema),
        switchMap(() =>
            this.blocks.load().pipe(
                map(result => new editorActions.BlocksSchemaLoaded(result)),
                catchError(error => of(new editorActions.BlocksSchemaFail(error)))
            )
        )
    );

    @Effect()
    loadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.LoadPage>(editorActions.EditorActionTypes.LoadPage),
        switchMap(() =>
            this.pages.downloadPage().pipe(
                map(data => {
                    const result = <PageModel>{
                        settings: data.find(x => x.type === 'settings') || { },
                        content: data.filter(x => x.type !== 'settings')
                    };
                    data.forEach((x, index) => x.id = index + 1);
                    return new editorActions.LoadPageSuccess(result);
                }),
                catchError(error => of(new editorActions.LoadPageFail(error)))
            )
        )
    );

    @Effect()
    uploadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.SavePage>(editorActions.EditorActionTypes.SavePage),
        withLatestFrom(this.store$.select(fromEditor.getPage)),
        switchMap(([, page]) => {
            const data = [page.settings, ...page.content];
            return this.pages.uploadPage(data).pipe(
                map(() => new editorActions.SavePageSuccess()),
                catchError(err => of(new editorActions.SavePageFail(err)))
            );
        })
    );

    @Effect({ dispatch: false })
    pageSaved$ = this.actions$.pipe(
        ofType<editorActions.SavePageSuccess>(editorActions.EditorActionTypes.SavePageSuccess),
        tap(() => {
            this.messages.displayMessage('Page saved successfully');
        })
    );

    @Effect({ dispatch: false })
    pageSaveFailed$ = this.actions$.pipe(
        ofType<editorActions.SavePageFail>(editorActions.EditorActionTypes.SavePageFail),
        tap((action) => {
            this.messages.displayError('Couldn\'t save page', action.payload);
        })
    );

    // @Effect()
    // loadCategories$: Observable<Action> = this.actions$.pipe(
    //     ofType<editorActions.LoadCategories>(editorActions.EditorActionTypes.LoadCategories),
    //     switchMap(_ =>
    //         this.catalog.getCategories().pipe(
    //             map(x => new editorActions.LoadCategoriesSuccess(x)),
    //             catchError(err => of(new editorActions.LoadPageFail(err)))
    //         )
    //     )
    // );
}
