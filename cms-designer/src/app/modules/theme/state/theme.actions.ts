import { Action } from '@ngrx/store';

import { PresetsModel } from '../models/presets.model';
import { ThemeItemModel } from '../models/theme-item.model';

export enum ThemeActionTypes {
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

export class LoadSettings implements Action {
    readonly type = ThemeActionTypes.LoadSettings;
}

export class LoadSettingsSuccess implements Action {
    readonly type = ThemeActionTypes.LoadSettingsSuccess;

    constructor(public payload: ThemeItemModel[]) { }
}

export class LoadSettingsFail implements Action {
    readonly type = ThemeActionTypes.LoadSettingsFail;

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
    | LoadSettings
    | LoadSettingsSuccess
    | LoadSettingsFail
    | SelectThemeItem
    | TogglePresetsPane;
