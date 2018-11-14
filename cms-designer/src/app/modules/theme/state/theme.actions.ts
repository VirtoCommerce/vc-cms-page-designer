import { Action } from '@ngrx/store';

import { PresetsModel } from '../models/presets.model';
import { BlockModel } from '../../shared/models';

export enum ThemeActionTypes {
    LoadThemes = '[Theme] Load Themes',
    LoadThemesSuccess = '[Theme] Load Themes Success',
    LoadThemesFail = '[Theme] Load Themes Fail',
    SaveTheme = '[Theme] Save Theme',
    SaveThemeSuccess = '[Theme] Save Theme Success',
    SaveThemeFail = '[Theme] Save Theme Fail',
    LoadSchema = '[Theme] Load Schema',
    LoadSchemaSuccess = '[Theme] Load Schema Success',
    LoadSchemaFail = '[Theme] Load Schema Fail',
    SelectSchemaItem = '[Theme] Select Schema Item',
    ShowPresetsPane = '[Theme] Show Presets Pane',
    CancelPreset = '[Theme] Cancel preset',
    ApplyPreset = '[Theme] Apply preset',
    UpdateTheme = '[Theme] Update Theme',
    ClearThemeChanges = '[Theme] Clear Theme Changes',
    RemovePreset = '[Theme] Remove Preset',
    CreatePreset = '[Theme] Create Preset',
    SelectPreset = '[Theme] Select Preset',
    UpdateDraft = '[Theme] Update Draft',
    UpdateDraftSuccess = '[Theme] Update Draft Success',
    UpdateDraftFail = '[Theme] Update Draft Fail'
}

export class LoadThemes implements Action {
    readonly type = ThemeActionTypes.LoadThemes;
}

export class LoadThemesSuccess implements Action {
    readonly type = ThemeActionTypes.LoadThemesSuccess;

    constructor(public payload: PresetsModel) { }
}

export class LoadThemesFail implements Action {
    readonly type = ThemeActionTypes.LoadThemesFail;

    constructor(public payload: string) { }
}

export class SaveTheme implements Action {
    readonly type = ThemeActionTypes.SaveTheme;
}

export class SaveThemeSuccess implements Action {
    readonly type = ThemeActionTypes.SaveThemeSuccess;
}

export class SaveThemeFail implements Action {
    readonly type = ThemeActionTypes.SaveThemeFail;

    constructor(public payload: string) { }
}

export class LoadSchema implements Action {
    readonly type = ThemeActionTypes.LoadSchema;
}

export class LoadSchemaSuccess implements Action {
    readonly type = ThemeActionTypes.LoadSchemaSuccess;

    constructor(public payload: BlockModel[]) { }
}

export class LoadSchemaFail implements Action {
    readonly type = ThemeActionTypes.LoadSchemaFail;

    constructor(public payload: string) { }
}

export class SelectSchemaItem implements Action {
    readonly type = ThemeActionTypes.SelectSchemaItem;

    constructor(public payload: BlockModel) { }
}

export class ShowPresetsPane implements Action {
    readonly type = ThemeActionTypes.ShowPresetsPane;
}

export class CancelPreset implements Action {
    readonly type = ThemeActionTypes.CancelPreset;
}

export class ApplyPreset implements Action {
    readonly type = ThemeActionTypes.ApplyPreset;

    constructor(public payload: string) { }
}

export class UpdateTheme implements Action {
    readonly type = ThemeActionTypes.UpdateTheme;

    constructor(public payload: { [key: string]: string | number | boolean }) { }
}

export class ClearThemeChanges implements Action {
    readonly type = ThemeActionTypes.ClearThemeChanges;
}

export class RemovePreset implements Action {
    readonly type = ThemeActionTypes.RemovePreset;

    constructor(public payload: string) { }
}

export class CreatePreset implements Action {
    readonly type = ThemeActionTypes.CreatePreset;

    constructor(public payload: string) { }
}

export class SelectPreset implements Action {
    readonly type = ThemeActionTypes.SelectPreset;

    constructor(public payload: string) { }
}

export class UpdateDraft implements Action {
    readonly type = ThemeActionTypes.UpdateDraft;
}

export class UpdateDraftSuccess implements Action {
    readonly type = ThemeActionTypes.UpdateDraftSuccess;
}

export class UpdateDraftFail implements Action {
    readonly type = ThemeActionTypes.UpdateDraftFail;
}


export type ThemeActions = LoadThemes
    | LoadThemesSuccess
    | LoadThemesFail
    | SaveTheme
    | SaveThemeSuccess
    | SaveThemeFail
    | LoadSchema
    | LoadSchemaSuccess
    | LoadSchemaFail
    | SelectSchemaItem
    | ShowPresetsPane
    | ApplyPreset
    | CancelPreset
    | UpdateTheme
    | ClearThemeChanges
    | RemovePreset
    | CreatePreset
    | SelectPreset
    | UpdateDraft
    | UpdateDraftSuccess
    | UpdateDraftFail;
