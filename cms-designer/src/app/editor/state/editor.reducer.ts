import { EditorActionTypes, EditorActions } from './editor.actions';
import { PresetsModel } from '../models/themes/presets.model';
import { PageModel } from '../models/page.model';

export interface EditorState {
    showPresetsEditor: boolean;
    currentThemeItem: number | null;
    error: string;
    currentTheme: any;
    presets: PresetsModel;
    settings: any[];
    page: PageModel;
}

const initialState: EditorState = {
    showPresetsEditor: false,
    currentThemeItem: null,
    error: '',
    currentTheme: {},
    presets: null,
    settings: [],
    page: null
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
        case EditorActionTypes.LoadPageSuccess:
            const model = new PageModel();
            model.sections = action.payload.filter(x => x.type !== 'settings');
            const settings = action.payload.find(x => x.type === 'settings') || { type: 'settings' };
            model.settings = settings;
            return {
                ...state,
                page: model
            };
        case EditorActionTypes.LoadPageFail:
            return {
                ...state,
                error: action.payload
            };
    }
    return state;
}
