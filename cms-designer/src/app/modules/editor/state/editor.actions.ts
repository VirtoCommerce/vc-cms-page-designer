import { BlockValuesModel } from './../../shared/models/block-values.model';
// import { CategoryModel } from './../models/category.model';
import { Action } from '@ngrx/store';

import { PageModel } from '../models/page.model';
import { SortEvent } from '../../shared/components';
import { BlockSchema, BlocksSchema } from 'src/app/modules/shared/models';
import { HttpErrorResponse } from '@angular/common/http';

export enum EditorActionTypes {
    AddPageItem = '[Page] Add Page Item',
    BlocksSchemaFail = '[Page] Blocks Schema Fail',
    BlocksSchemaLoaded = '[Page] Blocks Schema Loaded',
    ClearPageChanges = '[Page] Clear Page Changes',
    ClonePageItem = '[Page] Clone Page Item',
    CompleteEditPageItem = '[Page] Complete Edit Page Item',
    CopyPageItem = '[Page] Copy Page Item',
    CreatePageItem = '[Page] Create Page Item',
    LoadBlocksSchema = '[Page] Load Blocks Schema',
    // LoadCategories = '[Page] Load Categories',
    // LoadCategoriesFail = '[Page] Load Categories Fail',
    // LoadCategoriesSuccess = '[Page] Load Categories Success',
    LoadPage = '[Page] Load Page',
    LoadPageFail = '[Page] Load Page Fail',
    LoadPageSuccess = '[Page] Load Page Success',
    MoveBlock = '[Page] Move Block',
    OrderChanged = '[Page] Order Changed',
    PreviewPageItem = '[Page] Preview Page Item',
    PreviewPageItemOfType = '[Page] Preview Page Item Of Type',
    RemovePageItem = '[Page] Remove Page Item',
    SavePage = '[Page] Save Page',
    SavePageFail = '[Page] Save Page Fail',
    SavePageSuccess = '[Page] Save Page Success',
    SelectPageItem = '[Page] Select Page Item',
    ToggleNewBlockPane = '[Page] Toggle New Block Pane',
    UpdateBlockPreview = '[Page] Update Block Preview',
    UpdatePageItem = '[Page] Update Page Item'
}

export class AddPageItem implements Action {
    readonly type = EditorActionTypes.AddPageItem;

    constructor(public payload: BlockValuesModel) { }
}

export class BlocksSchemaFail implements Action {
    readonly type = EditorActionTypes.BlocksSchemaFail;

    constructor(public payload: HttpErrorResponse) { }
}

export class BlocksSchemaLoaded implements Action {
    readonly type = EditorActionTypes.BlocksSchemaLoaded;

    constructor(public payload: BlocksSchema) { }
}

export class ClearPageChanges implements Action {
    readonly type = EditorActionTypes.ClearPageChanges;
}

export class ClonePageItem implements Action {
    readonly type = EditorActionTypes.ClonePageItem;

    constructor(public payload: { oldBlock: BlockValuesModel, newBlock: BlockValuesModel }) { }
}

export class CompleteEditPageItem implements Action {
    readonly type = EditorActionTypes.CompleteEditPageItem;
}

export class CopyPageItem implements Action {
    readonly type = EditorActionTypes.CopyPageItem;

    constructor(public payload: BlockValuesModel) { }
}

export class CreatePageItem implements Action {
    readonly type = EditorActionTypes.CreatePageItem;

    constructor(public payload: BlockSchema) { }
}

export class LoadBlockTypes implements Action {
    readonly type = EditorActionTypes.LoadBlocksSchema;
}

// export class LoadCategories implements Action {
//     readonly type = EditorActionTypes.LoadCategories;
// }

// export class LoadCategoriesFail implements Action {
//     readonly type = EditorActionTypes.LoadCategoriesFail;

//     constructor(public payload: string) { }
// }

// export class LoadCategoriesSuccess implements Action {
//     readonly type = EditorActionTypes.LoadCategoriesSuccess;
//     constructor(public payload: CategoryModel[]) { }
// }

export class LoadPage implements Action {
    readonly type = EditorActionTypes.LoadPage;
}

export class LoadPageFail implements Action {
    readonly type = EditorActionTypes.LoadPageFail;
    constructor(public payload: HttpErrorResponse) { }
}

export class LoadPageSuccess implements Action {
    readonly type = EditorActionTypes.LoadPageSuccess;
    constructor(public payload: PageModel) { }
}

export class MoveBlock implements Action {
    readonly type = EditorActionTypes.MoveBlock;
    constructor(public payload: { oldIndex: number, newIndex: number }) { }
}

export class OrderChanged implements Action {
    readonly type = EditorActionTypes.OrderChanged;

    constructor(public payload: SortEvent) { }
}

export class PreviewPageItem implements Action {
    readonly type = EditorActionTypes.PreviewPageItem;

    constructor(public payload: BlockValuesModel) { }
}

export class PreviewPageItemOfType implements Action {
    readonly type = EditorActionTypes.PreviewPageItemOfType;

    constructor(public payload: BlockSchema) { }
}

export class RemovePageItem implements Action {
    readonly type = EditorActionTypes.RemovePageItem;

    constructor(public payload: BlockValuesModel) { }
}

export class SavePage implements Action {
    readonly type = EditorActionTypes.SavePage;
}

export class SavePageFail implements Action {
    readonly type = EditorActionTypes.SavePageFail;

    constructor(public payload: string) { }
}

export class SavePageSuccess implements Action {
    readonly type = EditorActionTypes.SavePageSuccess;
}

export class SelectPageItem implements Action {
    readonly type = EditorActionTypes.SelectPageItem;

    constructor(public payload: BlockValuesModel, public scrollTo: boolean = true) { }
}

export class ToggleNewBlockPane implements Action {
    readonly type = EditorActionTypes.ToggleNewBlockPane;

    constructor(public payload: boolean) { }
}

export class UpdateBlockPreview implements Action {
    readonly type = EditorActionTypes.UpdateBlockPreview;

    constructor(public payload: BlockValuesModel) { }
}

export class UpdatePageItem implements Action {
    readonly type = EditorActionTypes.UpdatePageItem;

    constructor(public payload: BlockValuesModel) { }
}

export type EditorActions = LoadPage
    | AddPageItem
    | BlocksSchemaFail
    | BlocksSchemaLoaded
    | ClearPageChanges
    | ClonePageItem
    | CompleteEditPageItem
    | CopyPageItem
    | CreatePageItem
    | LoadBlockTypes
    // | LoadCategories
    // | LoadCategoriesFail
    // | LoadCategoriesSuccess
    | LoadPage
    | LoadPageSuccess
    | LoadPageFail
    | MoveBlock
    | OrderChanged
    | PreviewPageItem
    | PreviewPageItemOfType
    | RemovePageItem
    | SavePage
    | SavePageFail
    | SavePageSuccess
    | SelectPageItem
    | ToggleNewBlockPane
    | UpdateBlockPreview
    | UpdatePageItem;
