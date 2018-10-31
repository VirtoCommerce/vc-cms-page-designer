import { CategoryModel } from './../models/category.model';
import { Action } from '@ngrx/store';

import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';
import { BlockType } from '../models/block-type.model';
import { SortEvent } from '../../shared/draggable';

export enum EditorActionTypes {
    LoadPage = '[Page] Load Page',
    LoadPageSuccess = '[Page] Load Page Success',
    LoadPageFail = '[Page] Load Page Fail',
    ToggleNewBlockPane = '[Page] Toggle New Block Pane',
    SelectPageItem = '[Page] Select Page Item',
    CreatePageItem = '[Page] Create Page Item',
    AddPageItem = '[Page] Add Page Item',
    UpdatePageItem = '[Page] Update Page Item',
    UpdateBlockPreview = '[Page] Update Block Preview',
    RemovePageItem = '[Page] Remove Page Item',
    BlockTypesLoaded = '[Page] Block Types Loaded',
    LoadBlockTypes = '[Page] Load Block Types',
    PreviewReady = '[Page] Preview is ready',
    PreviewPageItem = '[Page] Preview Page Item',
    OrderChanged = '[Page] Order Changed',
    SavePage = '[Page] Save Page',
    SavePageSuccess = '[Page] Save Page Success',
    SavePageFail = '[Page] Save Page Fail',
    ClearPageChanges = '[Page] Clear Page Changes',
    LoadCategories = '[Page] Load Categories',
    LoadCategoriesSuccess = '[Page] Load Categories Success',
    LoadCategoriesFail = '[Page] Load Categories Fail'
}

export class PreviewReady implements Action {
    readonly type = EditorActionTypes.PreviewReady;
}

export class LoadPage implements Action {
    readonly type = EditorActionTypes.LoadPage;
}

export class LoadPageSuccess implements Action {
    readonly type = EditorActionTypes.LoadPageSuccess;
    constructor(public payload: PageModel) { }
}

export class LoadPageFail implements Action {
    readonly type = EditorActionTypes.LoadPageFail;
    constructor(public payload: string) { }
}

export class SelectPageItem implements Action {
    readonly type = EditorActionTypes.SelectPageItem;

    constructor(public payload: SectionModel) { }
}

export class CreatePageItem implements Action {
    readonly type = EditorActionTypes.CreatePageItem;

    constructor(public payload: BlockType) { }
}

export class PreviewPageItem implements Action {
    readonly type = EditorActionTypes.PreviewPageItem;

    constructor(public payload: BlockType) { }
}

export class RemovePageItem implements Action {
    readonly type = EditorActionTypes.RemovePageItem;

    constructor(public payload: SectionModel) { }
}

export class AddPageItem implements Action {
    readonly type = EditorActionTypes.AddPageItem;

    constructor(public payload: SectionModel) { }
}

export class UpdatePageItem implements Action {
    readonly type = EditorActionTypes.UpdatePageItem;

    constructor(public payload: SectionModel) { }
}

export class UpdateBlockPreview implements Action {
    readonly type = EditorActionTypes.UpdateBlockPreview;

    constructor(public payload: SectionModel) { }
}

export class ToggleNewBlockPane implements Action {
    readonly type = EditorActionTypes.ToggleNewBlockPane;

    constructor(public payload: boolean) { }
}

export class LoadBlockTypes implements Action {
    readonly type = EditorActionTypes.LoadBlockTypes;
}

export class BlockTypesLoaded implements Action {
    readonly type = EditorActionTypes.BlockTypesLoaded;

    constructor(public payload: any[]) { }
}

export class OrderChanged implements Action {
    readonly type = EditorActionTypes.OrderChanged;

    constructor(public payload: SortEvent) { }
}

export class SavePage implements Action {
    readonly type = EditorActionTypes.SavePage;
}

export class SavePageSuccess implements Action {
    readonly type = EditorActionTypes.SavePageSuccess;
}

export class SavePageFail implements Action {
    readonly type = EditorActionTypes.SavePageFail;

    constructor(public payload: string) { }
}

export class ClearPageChanges implements Action {
    readonly type = EditorActionTypes.ClearPageChanges;
}

export class LoadCategories implements Action {
    readonly type = EditorActionTypes.LoadCategories;
}

export class LoadCategoriesSuccess implements Action {
    readonly type = EditorActionTypes.LoadCategoriesSuccess;
    constructor(public payload: CategoryModel[]) { }
}

export class LoadCategoriesFail implements Action {
    readonly type = EditorActionTypes.LoadCategoriesFail;

    constructor(public payload: string) { }
}

export type EditorActions = LoadPage
    | LoadPageSuccess
    | LoadPageFail
    | ToggleNewBlockPane
    | SelectPageItem
    | CreatePageItem
    | AddPageItem
    | UpdatePageItem
    | UpdateBlockPreview
    | RemovePageItem
    | BlockTypesLoaded
    | PreviewReady
    | OrderChanged
    | SavePage
    | SavePageSuccess
    | SavePageFail
    | ClearPageChanges
    | LoadCategories
    | LoadCategoriesSuccess
    | LoadCategoriesFail;
