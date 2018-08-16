import { Action } from '@ngrx/store';
import { PresetsModel } from '../models/themes/presets.model';
import { ThemeItemModel } from '../models/themes/theme-item.model';

export enum EditorActionTypes {
    LoadPresets = 'Load Presets',
    LoadPresetsSuccess = 'Load Presets Success',
    LoadPresetsFail = 'Load Presets Fail',
    LoadSettings = 'Load Settings',
    LoadSettingsSuccess = 'Load Settings Success',
    LoadSettingsFail = 'Load Settings Fail',
    SelectThemeItem = 'Select Theme Item',
    TogglePresetsPane = 'Toggle Presets Pane'
}

export class LoadPresets implements Action {
    readonly type = EditorActionTypes.LoadPresets;
}

export class LoadPresetsSuccess implements Action {
    readonly type = EditorActionTypes.LoadPresetsSuccess;

    constructor(public payload: PresetsModel) { }
}

export class LoadPresetsFail implements Action {
    readonly type = EditorActionTypes.LoadPresetsFail;

    constructor(public payload: string) { }
}

export class LoadSettings implements Action {
    readonly type = EditorActionTypes.LoadSettings;
}

export class LoadSettingsSuccess implements Action {
    readonly type = EditorActionTypes.LoadSettingsSuccess;

    constructor(public payload: ThemeItemModel[]) { }
}

export class LoadSettingsFail implements Action {
    readonly type = EditorActionTypes.LoadSettingsFail;

    constructor(public payload: string) { }
}

export class SelectThemeItem implements Action {
    readonly type = EditorActionTypes.SelectThemeItem;

    constructor(public payload: any) { }
}

export class TogglePresetsPane implements Action {
    readonly type = EditorActionTypes.TogglePresetsPane;

    constructor(public payload: boolean) { }
}

export type EditorActions = LoadPresets
    | LoadPresetsSuccess
    | LoadPresetsFail
    | LoadSettings
    | LoadSettingsSuccess
    | LoadSettingsFail
    | SelectThemeItem
    | TogglePresetsPane;
