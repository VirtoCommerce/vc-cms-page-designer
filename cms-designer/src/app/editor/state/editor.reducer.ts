import { EditorActionTypes, EditorActions } from './editor.actions';
import { PresetsModel } from '../models/themes/presets.model';

export interface EditorState {
    showPresetsEditor: boolean;
    currentThemeItem: number | null;
    error: string;
    currentTheme: any;
    presets: PresetsModel;
    settings: any[];
}

const initialState: EditorState = {
    showPresetsEditor: false,
    currentThemeItem: null,
    error: '',
    currentTheme: {},
    presets: null,
    settings: []
};

export function reducer(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EditorActionTypes.LoadSettingsSuccess:
            return {
                ...state,
                settings: action.payload
            };
        case EditorActionTypes.LoadSettingsFail:
            return {
                ...state,
                error: action.payload
            };
        case EditorActionTypes.LoadPresetsSuccess:
            return {
                ...state,
                currentTheme: { ...action.payload.presets[action.payload.current] },
                presets: action.payload
            };
        case EditorActionTypes.LoadPresetsFail:
            return {
                ...state,
                error: action.payload
            };
        case EditorActionTypes.SelectThemeItem:
            return {
                ...state,
                currentThemeItem: action.payload
            };
        case EditorActionTypes.TogglePresetsPane:
            return {
                ...state,
                showPresetsEditor: action.payload
            };
    }
    return state;
}
