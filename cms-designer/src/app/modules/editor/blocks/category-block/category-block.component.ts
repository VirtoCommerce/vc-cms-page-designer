import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromEditor from 'src/app/modules/editor/state';
import * as editorActions from 'src/app/modules/editor/state/editor.actions';
import { BlockType, SectionModel } from '../../models';

@Component({
    templateUrl: './category-block.component.html'
})
export class CategoryBlockComponent implements OnInit {
    static Key = 'category';

    @Input() model: any;
    @Input() group: FormGroup;

    categories: [];

    constructor(private store: Store<fromEditor.State>) { }

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: CategoryBlockComponent.Key,
            name: item.name,
            title: '',
            category: null
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: CategoryBlockComponent.Key,
            name: 'Category Block',
            title: 'Category',
            category: null
        };
    }

    ngOnInit(): void {
        // this.store.dispatch(new editorActions.LoadCategories());
        // this.categories$ = this.store.select(fromEditor.getCategories);
    }

}
