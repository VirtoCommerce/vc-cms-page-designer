import { Action } from '@ngrx/store';

export enum RootActionTypes {
    ResetData = '[Root] Reset Data',
    SaveData = '[Root] Save Data',
    SaveDataSuccess = '[Root] Save Data Success',
    SaveDataFail = '[Root] Save Data Fail',
    LoadData = '[Root] Load Data',
    LoadDataSuccess = '[Root] Load Data Success',
    LoadDataFail = '[Root] Load Data Fail',
    PreviewLoading = '[Root] Preview Loading',
    PreviewReady = '[Root] Preview is Ready',
    ToggleFrames = '[Root] Toggle Frames'
}

export class ResetData implements Action {
    readonly type = RootActionTypes.ResetData;
}

export class SaveData implements Action {
    readonly type = RootActionTypes.SaveData;
}

export class SaveDataSuccess implements Action {
    readonly type = RootActionTypes.SaveDataSuccess;
}

export class SaveDataFail implements Action {
    readonly type = RootActionTypes.SaveDataFail;

    constructor(public payload: string) { }
}

export class LoadData implements Action {
    readonly type = RootActionTypes.LoadData;
}

export class LoadDataSuccess implements Action {
    readonly type = RootActionTypes.LoadDataSuccess;
}

export class LoadDataFail implements Action {
    readonly type = RootActionTypes.LoadDataFail;

    constructor(public payload: string) { }
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

export type RootActions = ResetData
    | SaveData
    | SaveDataSuccess
    | SaveDataFail
    | LoadData
    | LoadDataSuccess
    | LoadDataFail
    | PreviewLoading
    | PreviewReady
    | ToggleFrames;
