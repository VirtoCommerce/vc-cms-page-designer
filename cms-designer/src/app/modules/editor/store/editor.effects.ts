import { BlockValuesModel } from './../../shared/models/block-values.model';
import { map, flatMap, filter, switchMapTo } from 'rxjs/operators';
// import { CatalogService } from './../services/catalog.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
    catchError,
    mergeMap,
    switchMap,
    withLatestFrom
} from 'rxjs/operators';

import * as editorActions from './editor.actions';
import * as fromEditor from '.';

import { PagesService } from '../services/pages.service';
import { PageModel } from '../models/page.model';
import { BlocksService } from '../services/blocks.service';
// import { CategoryModel } from '../models';

@Injectable()
export class EditorEffects {
    constructor(private pages: PagesService,
        // private catalog: CatalogService,
        private blocks: BlocksService,
        private actions$: Actions, private store$: Store<fromEditor.State>) { }

    @Effect()
    convertPageTypeToPreviewSection$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItemOfType>(editorActions.EditorActionTypes.PreviewPageItemOfType),
        map(action => action.payload),
        map(blockSchema => {
            if (!!blockSchema) {
                const result = <BlockValuesModel>{};
                blockSchema.settings.forEach(x => result[x.id] = x['default'] || null);
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
        withLatestFrom(this.store$.select(state => state.editor.page)),
        flatMap(([action, page]) => {
            const block = { ...action.payload };
            block.id = page.content.reduce((v: number, b: BlockValuesModel) => Math.max(<number>b.id, v), 0) + 1;
            return [
                new editorActions.ClonePageItem({ oldBlock: action.payload, newBlock: block }),
                new editorActions.SelectPageItem(block, true)
            ];
        })
    );

    @Effect()
    createPageItemModelByType$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.CreatePageItem),
        map((action: editorActions.CreatePageItem) => action.payload),
        withLatestFrom(this.store$.select(state => state.editor.page)),
        map(([blockSchema, page]) => {
            const block = <BlockValuesModel>{
                id: Math.max(...page.content.map(v => <number>v.id || 0)) + 1,
                type: blockSchema.type
            };
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
        withLatestFrom(this.store$.select(state => state.editor.page)),
        switchMap(([, page]) => {
            const data = [page.settings, ...page.content];
            return this.pages.uploadPage(data).pipe(
                map(() => new editorActions.SavePageSuccess()),
                catchError(err => of(new editorActions.SavePageFail(err)))
            );
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
