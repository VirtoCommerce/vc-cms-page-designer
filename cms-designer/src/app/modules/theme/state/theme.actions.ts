import { Action } from '@ngrx/store';

import { PresetsModel } from '../models/presets.model';
import { SchemaItemModel } from '../models/schema-item.model';

export enum ThemeActionTypes {
    LoadPresets = '[Theme] Load Presets',
    LoadPresetsSuccess = '[Theme] Load Presets Success',
    LoadPresetsFail = '[Theme] Load Presets Fail',
    SavePresets = '[Theme] Save Presets',
    SavePresetsSuccess = '[Theme] Save Presets Success',
    SavePresetsFail = '[Theme] Save Presets Fail',
    LoadSchema = '[Theme] Load Schema',
    LoadSchemaSuccess = '[Theme] Load Schema Success',
    LoadSchemaFail = '[Theme] Load Schema Fail',
    SelectSchemaItem = '[Theme] Select Schema Item',
    TogglePresetsPane = '[Theme] Toggle Presets Pane',
    UpdateTheme = '[Theme] Update Theme',
    ClearThemeChanges = '[Theme] Clear Theme Changes',
    RemovePreset = '[Theme] Remove Preset',
    CreatePreset = '[Theme] Create Preset',
    SelectPreset = '[Theme] Select Preset'
}

export class LoadPresets implements Action {
    readonly type = ThemeActionTypes.LoadPresets;
}

export class LoadPresetsSuccess implements Action {
    readonly type = ThemeActionTypes.LoadPresetsSuccess;

    constructor(public payload: PresetsModel) { }
}

export class LoadPresetsFail implements Action {
    readonly type = ThemeActionTypes.LoadPresetsFail;

    constructor(public payload: string) { }
}

export class SavePresets implements Action {
    readonly type = ThemeActionTypes.SavePresets;
}

export class SavePresetsSuccess implements Action {
    readonly type = ThemeActionTypes.SavePresetsSuccess;
}

export class SavePresetsFail implements Action {
    readonly type = ThemeActionTypes.SavePresetsFail;

    constructor(public payload: string) { }
}

export class LoadSchema implements Action {
    readonly type = ThemeActionTypes.LoadSchema;
}

export class LoadSchemaSuccess implements Action {
    readonly type = ThemeActionTypes.LoadSchemaSuccess;

    constructor(public payload: SchemaItemModel[]) { }
}

export class LoadSchemaFail implements Action {
    readonly type = ThemeActionTypes.LoadSchemaFail;

    constructor(public payload: string) { }
}

export class SelectSchemaItem implements Action {
    readonly type = ThemeActionTypes.SelectSchemaItem;

    constructor(public payload: SchemaItemModel) { }
}

export class TogglePresetsPane implements Action {
    readonly type = ThemeActionTypes.TogglePresetsPane;

    constructor(public payload: boolean) { }
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

export type ThemeActions = LoadPresets
    | LoadPresetsSuccess
    | LoadPresetsFail
    | SavePresets
    | SavePresetsSuccess
    | SavePresetsFail
    | LoadSchema
    | LoadSchemaSuccess
    | LoadSchemaFail
    | SelectSchemaItem
    | TogglePresetsPane
    | UpdateTheme
    | ClearThemeChanges
    | RemovePreset
    | CreatePreset
    | SelectPreset;
