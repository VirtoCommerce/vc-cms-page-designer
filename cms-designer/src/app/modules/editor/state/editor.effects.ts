import { BlockValuesModel } from './../../shared/models/block-values.model';
import { BlockSchema } from 'src/app/modules/shared/models';
import { map } from 'rxjs/operators';
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
import { ControlsFactory } from '../../shared/controls/controls.factory';
import { BlocksService } from '../services/blocks.service';
// import { CategoryModel } from '../models';

@Injectable()
export class EditorEffects {
    constructor(private pages: PagesService,
        // private catalog: CatalogService,
        private blocks: BlocksService,
        private actions$: Actions, private store$: Store<fromEditor.State>) { }

    @Effect()
    loadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.LoadPage>(editorActions.EditorActionTypes.LoadPage),
        switchMap(_ =>
            this.pages.downloadPage().pipe(
                map(data => {
                    data.forEach((x, index) => x.id = index + 1);
                    return new editorActions.LoadPageSuccess(data);
                }),
                catchError(err => of(new editorActions.LoadPageFail(err)))
            )
        )
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

    @Effect()
    uploadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.SavePage>(editorActions.EditorActionTypes.SavePage),
        withLatestFrom(this.store$.select(state => state.editor.page)),
        switchMap(([_, page]) =>
            this.pages.uploadPage(page).pipe(
                map(() => new editorActions.SavePageSuccess()),
                catchError(err => of(new editorActions.SavePageFail(err)))
            )
        )
    );

    @Effect()
    loadBlockTypes$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadBlockTypes),
        switchMap(_ =>
            this.blocks.load().pipe(
                map(result => new editorActions.BlockTypesLoaded(result)),
                catchError(err => of(new editorActions.LoadPageFail(err)))
            )
        )
    );

    @Effect()
    createPageItemModelByType$ = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.CreatePageItem),
        map((action: editorActions.CreatePageItem) => action.payload),
        withLatestFrom(this.store$.select(state => state.editor.blocksSchema)),
        map(([type, schema]) => {
            console.log(type, schema);
            return <BlockValuesModel>{};
        }),
        mergeMap(item =>
            of(new editorActions.AddPageItem(item))
        )
    );

    @Effect()
    convertPageTypeToPreviewSection$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItemOfType>(editorActions.EditorActionTypes.PreviewPageItemOfType),
        map(action => action.payload),
        map(type => {
            if (!!type) {
                const result = <BlockValuesModel>{};
                type.settings.forEach(x => result[x.id] = x['default'] || null);
                result.type = type.type;
                return result;
            }
            return null;
        }),
        mergeMap(item =>
            of(new editorActions.PreviewPageItem(item))
        )
    );
}
