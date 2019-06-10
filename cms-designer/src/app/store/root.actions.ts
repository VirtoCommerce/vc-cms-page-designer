import { Action } from '@ngrx/store';

export enum RootActionTypes {
    ResetData = '[Root] Reset Data',
    SaveData = '[Root] Save Data',
    LoadData = '[Root] Load Data',
    PreviewLoading = '[Root] Preview Loading',
    PreviewReady = '[Root] Preview is Ready',
    PreviewError = '[Root] Preview in Error mode',
    ReloadPreview = '[Root] Reload Preview',
    CheckPreviewLoadedOrError = '[Root] Check Preview Loaded Or Error',
    ToggleFrames = '[Root] Toggle Frames',
    CloseEditors = '[Root] Close editors',
    TabIndexChanged = '[Root] Tab Index Changed',
    SetPreviewUrl = '[Root] Set Preview Url'
}

export class ResetData implements Action {
    readonly type = RootActionTypes.ResetData;
}

export class SaveData implements Action {
    readonly type = RootActionTypes.SaveData;
}

export class LoadData implements Action {
    readonly type = RootActionTypes.LoadData;
}

export class PreviewLoading implements Action {
    readonly type = RootActionTypes.PreviewLoading;

    constructor(public payload: boolean, public source: string) { }
}

export class PreviewReady implements Action {
    readonly type = RootActionTypes.PreviewReady;

    constructor(public payload: string) { }
}

export class PreviewError implements Action {
    readonly type = RootActionTypes.PreviewError;

    constructor (public payload: any) { }
}

export class ReloadPreview implements Action {
    readonly type = RootActionTypes.ReloadPreview;
}

export class CheckPreviewLoadedOrError implements Action {
    readonly type = RootActionTypes.CheckPreviewLoadedOrError;
}

export class ToggleFrames implements Action {
    readonly type = RootActionTypes.ToggleFrames;

    // payload is an id of frame which was loaded and should be displayed
    constructor (public payload: string) { }
}

export class CloseEditors implements Action {
    readonly type = RootActionTypes.CloseEditors;
}

export class TabIndexChanged implements Action {
    readonly type = RootActionTypes.TabIndexChanged;

    constructor(public payload: number) { }
}

export class SetPreviewUrl implements Action {
    readonly type = RootActionTypes.SetPreviewUrl;

    constructor(public payload: string) { }
}

export type RootActions = ResetData
    | SaveData
    | LoadData
    | PreviewLoading
    | PreviewReady
    | PreviewError
    | ReloadPreview
    | CheckPreviewLoadedOrError
    | ToggleFrames
    | CloseEditors
    | TabIndexChanged
    | SetPreviewUrl;
