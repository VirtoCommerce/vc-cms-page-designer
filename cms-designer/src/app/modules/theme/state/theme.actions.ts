import { PageDescriptor } from 'src/app/models/page.descriptor';
import { Action } from '@ngrx/store';

import { PresetsModel } from '../models/presets.model';
import { SchemaItemModel } from '../models/schema-item.model';

export enum ThemeActionTypes {
    LoadPresets = 'Load Presets',
    LoadPresetsSuccess = 'Load Presets Success',
    LoadPresetsFail = 'Load Presets Fail',
    SavePresets = 'Save Presets',
    SavePresetsSuccess = 'Save Presets Success',
    SavePresetsFail = 'Save Presets Fail',
    LoadSchema = 'Load Schema',
    LoadSchemaSuccess = 'Load Schema Success',
    LoadSchemaFail = 'Load Schema Fail',
    SelectSchemaItem = 'Select Schema Item',
    TogglePresetsPane = 'Toggle Presets Pane',
    UpdateTheme = 'Update Theme',
    ClearThemeChanges = 'Clear Theme Changes',
    RemovePreset = 'Remove Preset',
    CreatePreset = 'Create Preset',
    SelectPreset = 'Select Preset'
}

export class LoadPresets implements Action {
    readonly type = ThemeActionTypes.LoadPresets;

    constructor(public payload: PageDescriptor) { }
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

    constructor(public payload: PageDescriptor) { }
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

    constructor(public payload: {[key: string]: any}) { }
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
