import { Action } from '@ngrx/store';

import { PresetsModel } from '../models/presets.model';
import { ThemeItemModel } from '../models/theme-item.model';

export enum ThemeActionTypes {
    LoadPresets = 'Load Presets',
    LoadPresetsSuccess = 'Load Presets Success',
    LoadPresetsFail = 'Load Presets Fail',
    LoadSchema = 'Load Schema',
    LoadSchemaSuccess = 'Load Schema Success',
    LoadSchemaFail = 'Load Schema Fail',
    SelectThemeItem = 'Select Theme Item',
    TogglePresetsPane = 'Toggle Presets Pane'
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

export class LoadSchema implements Action {
    readonly type = ThemeActionTypes.LoadSchema;
}

export class LoadSchemaSuccess implements Action {
    readonly type = ThemeActionTypes.LoadSchemaSuccess;

    constructor(public payload: ThemeItemModel[]) { }
}

export class LoadSchemaFail implements Action {
    readonly type = ThemeActionTypes.LoadSchemaFail;

    constructor(public payload: string) { }
}

export class SelectThemeItem implements Action {
    readonly type = ThemeActionTypes.SelectThemeItem;

    constructor(public payload: any) { }
}

export class TogglePresetsPane implements Action {
    readonly type = ThemeActionTypes.TogglePresetsPane;

    constructor(public payload: boolean) { }
}

export type ThemeActions = LoadPresets
    | LoadPresetsSuccess
    | LoadPresetsFail
    | LoadSchema
    | LoadSchemaSuccess
    | LoadSchemaFail
    | SelectThemeItem
    | TogglePresetsPane;
