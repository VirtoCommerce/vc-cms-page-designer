import { RootActionTypes, RootActions } from './root.actions';

export interface RootState {
    previewLoading: boolean;
    primaryFrameId: string;
    secondaryFrameId: string;
    primaryLoaded: boolean;
    secondaryLoaded: boolean;
    activeTabIndex: number;
    previewUrl: string;
}

const initialState: RootState = {
    previewLoading: false,
    primaryFrameId: null,
    secondaryFrameId: null,
    primaryLoaded: false,
    secondaryLoaded: false,
    activeTabIndex: 0,
    previewUrl: null
};

export function reducer(state = initialState, action: RootActions): RootState {
    switch (action.type) {
        case RootActionTypes.PreviewLoading:
            return {
                ...state,
                previewLoading: action.payload
            };
        case RootActionTypes.PreviewReady: {
            // occurs when each iframe is loaded
            const newValues: Partial<RootState> = {};
            if (!state.primaryFrameId) {
                newValues.primaryFrameId = action.payload;
                newValues.primaryLoaded = true;
            } else if (!state.secondaryFrameId) {
                newValues.secondaryFrameId = action.payload;
                newValues.secondaryLoaded = true;
            }
            return {
                ...state,
                ...newValues
            };
        }
        case RootActionTypes.ToggleFrames: {
            // occurs when page in preview rendered
            const newValues: Partial<RootState> = {};
            newValues.primaryFrameId = state.secondaryFrameId;
            newValues.secondaryFrameId = state.primaryFrameId;
            console.log('toggle', newValues.primaryFrameId, 'is primary now');
            return {
                ...state,
                ...newValues
            };
        }
        case RootActionTypes.TabIndexChanged: {
            return {
                ...state,
                activeTabIndex: action.payload
            };
        }
        case RootActionTypes.SetPreviewUrl: {
            return {
                ...state,
                previewUrl: action.payload
            };
        }
    }
    return state;
}
