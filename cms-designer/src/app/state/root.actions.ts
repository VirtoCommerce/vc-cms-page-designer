import { Action } from '@ngrx/store';

export enum RootActionTypes {
    ResetData = 'Reset Data',
    SaveData = 'Save Data',
    SaveDataSuccess = 'Save Data Success',
    SaveDataFail = 'Save Data Fail',
    LoadData = 'Load Data',
    LoadDataSuccess = 'Load Data Success',
    LoadDataFail = 'Load Data Fail'
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


export type RootActions = ResetData
    | SaveData
    | SaveDataSuccess
    | SaveDataFail
    | LoadData
    | LoadDataSuccess
    | LoadDataFail;
