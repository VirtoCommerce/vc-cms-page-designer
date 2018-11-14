// import { CatalogService } from './../services/catalog.service';
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
import { BlocksComponentFactory } from '../blocks/blocks-component.factory';
// import { CategoryModel } from '../models';

@Injectable()
export class EditorEffects {
    constructor(private pages: PagesService,
        // private catalog: CatalogService,
        private blockFactory: BlocksComponentFactory,
        private actions$: Actions, private store$: Store<fromEditor.State>) { }

    @Effect()
    loadPage$: Observable<Action> = this.actions$.pipe(
        ofType<editorActions.LoadPage>(editorActions.EditorActionTypes.LoadPage),
        switchMap(_ =>
            this.pages.downloadPage().pipe(
                map(data => {
                    const model = <PageModel>{
                        sections: data.filter(x => x.type !== 'settings'),
                        settings: data.find(x => x.type === 'settings') || { type: 'settings' }
                    };
                    model.sections.forEach((x, index) => x.id = index + 1);
                    return new editorActions.LoadPageSuccess(model);
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
            this.pages.uploadPage([page.settings, ...page.sections]).pipe(
                map(() => new editorActions.SavePageSuccess()),
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

    @Effect()
    convertPageTypeToPreviewSection$ = this.actions$.pipe(
        ofType<editorActions.PreviewPageItemOfType>(editorActions.EditorActionTypes.PreviewPageItemOfType),
        map(action => action.payload),
        map(item => !!item ? this.blockFactory.createPreview(item.type) : null),
        mergeMap(item =>
            of(new editorActions.PreviewPageItem(item))
        )
    );
}
