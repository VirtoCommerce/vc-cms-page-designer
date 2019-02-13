import { Action } from '@ngrx/store';

export enum RootActionTypes {
    ResetData = '[Root] Reset Data',
    SaveData = '[Root] Save Data',
    LoadData = '[Root] Load Data',
    PreviewLoading = '[Root] Preview Loading',
    PreviewReady = '[Root] Preview is Ready',
    ToggleFrames = '[Root] Toggle Frames',
    CloseEditors = '[Root] Close editors'
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

    constructor(public payload: boolean) { }
}

export class PreviewReady implements Action {
    readonly type = RootActionTypes.PreviewReady;

    constructor(public payload: string) { }
}

export class ToggleFrames implements Action {
    readonly type = RootActionTypes.ToggleFrames;

    // payload is an id of frame which was loaded and should be displayed
    constructor (public payload: string) { }
}

export class CloseEditors implements Action {
    readonly type = RootActionTypes.CloseEditors;
}

export type RootActions = ResetData
    | SaveData
    | LoadData
    | PreviewLoading
    | PreviewReady
    | ToggleFrames
    | CloseEditors;
