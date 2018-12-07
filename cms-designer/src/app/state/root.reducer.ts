import { RootActionTypes, RootActions, ResetData } from './root.actions';

export interface RootState {
    loading: boolean;
}

const initialState: RootState = {
    loading: false
};

export function reducer(state = initialState, action: RootActions): RootState {
    switch (action.type) {
        case RootActionTypes.PreviewLoading:
            return {
                ...state,
                loading: action.payload
            };
    }
    return state;
}
