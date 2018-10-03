import { Action } from '@ngrx/store';

import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';

export enum EditorActionTypes {
    LoadPage = 'Load Page',
    LoadPageSuccess = 'Load Page Success',
    LoadPageFail = 'Load Page Fail',
    ToggleNewBlockPane = 'Toggle New Block Pane',
    SelectPageItem = 'Select Page Item',
    CreatePageItem = 'Create Page Item',
    AddPageItem = 'Add Page Item',
    UpdatePageItem = 'Update Page Item',
    UpdateBlockItem = 'Update Block Item',
    BlockTypesLoaded = 'Block Types Loaded',
    LoadBlockTypes = 'Load Block Types',
    PreviewReady = 'Preview is ready'
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

    constructor(public payload: string) { }
}

export class AddPageItem implements Action {
    readonly type = EditorActionTypes.AddPageItem;

    constructor(public payload: SectionModel) { }
}

export class UpdatePageItem implements Action {
    readonly type = EditorActionTypes.UpdatePageItem;

    constructor(public payload: SectionModel) { }
}

export class UpdateBlockItem implements Action {
    readonly type = EditorActionTypes.UpdateBlockItem;

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

export type EditorActions = LoadPage
    | LoadPageSuccess
    | LoadPageFail
    | ToggleNewBlockPane
    | SelectPageItem
    | CreatePageItem
    | AddPageItem
    | UpdatePageItem
    | UpdateBlockItem
    | BlockTypesLoaded
    | PreviewReady;
