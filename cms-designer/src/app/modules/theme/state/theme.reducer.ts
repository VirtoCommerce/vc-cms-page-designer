import { ThemeActionTypes, ThemeActions } from './theme.actions';
import { PresetsModel } from '../models/presets.model';

export interface ThemeState {
    showPresetsEditor: boolean;
    currentThemeItem: any;
    error: string;
    currentTheme: any;
    presets: PresetsModel;
    settings: any[];
}

const initialState: ThemeState = {
    showPresetsEditor: false,
    currentThemeItem: null,
    error: '',
    currentTheme: {},
    presets: null,
    settings: []
};

export function reducer(state = initialState, action: ThemeActions): ThemeState {
    switch (action.type) {
        case ThemeActionTypes.LoadSettingsSuccess:
            return {
                ...state,
                settings: action.payload
            };
        case ThemeActionTypes.LoadSettingsFail:
            return {
                ...state,
                error: action.payload
            };
        case ThemeActionTypes.LoadPresetsSuccess:
            return {
                ...state,
                currentTheme: { ...action.payload.presets[action.payload.current] },
                presets: action.payload
            };
        case ThemeActionTypes.LoadPresetsFail:
            return {
                ...state,
                error: action.payload
            };
        case ThemeActionTypes.SelectThemeItem:
            return {
                ...state,
                currentThemeItem: action.payload
            };
        case ThemeActionTypes.TogglePresetsPane:
            return {
                ...state,
                showPresetsEditor: action.payload
            };
    }
    return state;
}
