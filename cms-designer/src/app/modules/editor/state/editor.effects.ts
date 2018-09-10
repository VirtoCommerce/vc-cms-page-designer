import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, debounceTime } from 'rxjs/operators';

import * as editorActions from './editor.actions';
import { PageService } from '../services/page.service';
import { PageModel } from '../models/page.model';

@Injectable()
export class EditorEffects {
    constructor(private pageService: PageService, private actions$: Actions) { }

    @Effect()
    loadPage$: Observable<Action> = this.actions$.pipe(
        ofType(editorActions.EditorActionTypes.LoadPage),
        mergeMap(action =>
            this.pageService.loadPage().pipe(
                map(data => {
                    const model = new PageModel();
                    model.sections = data.filter(x => x.type !== 'settings');
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
        mergeMap(action =>
            of(new editorActions.BlockTypesLoaded(this.pageService.availableTypes))
        )
    );
}