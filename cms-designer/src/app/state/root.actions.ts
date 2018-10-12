import { Action } from '@ngrx/store';
import { PageDescriptor } from '../models/page.descriptor';

export enum RootActionTypes {
    ResetData = 'Reset Data',
    SaveData = 'Save Data',
    SaveDataSuccess = 'Save Data Success',
    SaveDataFail = 'Save Data Fail',
}

export class ResetData implements Action {
    readonly type = RootActionTypes.ResetData;
}

export class SaveData implements Action {
    readonly type = RootActionTypes.SaveData;

    constructor(public payload: PageDescriptor) { }
}

export class SaveDataSuccess implements Action {
    readonly type = RootActionTypes.SaveDataSuccess;
}

export class SaveDataFail implements Action {
    readonly type = RootActionTypes.SaveDataFail;

    constructor(public payload: string) { }
}


export type RootActions = ResetData
    | SaveData
    | SaveDataFail
    | SaveDataSuccess;
