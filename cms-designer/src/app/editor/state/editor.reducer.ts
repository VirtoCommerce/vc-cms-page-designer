import { EditorActionTypes, EditorActions } from './editor.actions';
import { PresetsModel } from '../models/themes/presets.model';
import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';

export interface EditorState {
    showPresetsEditor: boolean;
    showNewBlockSelector: boolean;
    currentThemeItem: any;
    currentSectionItem: SectionModel;
    error: string;
    currentTheme: any;
    presets: PresetsModel;
    settings: any[];
    page: PageModel;
    blockTypes: any[];
}

const initialState: EditorState = {
    showPresetsEditor: false,
    showNewBlockSelector: false,
    currentThemeItem: null,
    currentSectionItem: null,
    error: '',
    currentTheme: {},
    presets: null,
    settings: [],
    page: null,
    blockTypes: []
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
        case EditorActionTypes.ToggleNewBlockPane:
            return {
                ...state,
                showNewBlockSelector: action.payload
            };
        case EditorActionTypes.BlockTypesLoaded:
            return {
                ...state,
                blockTypes: action.payload
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
        case EditorActionTypes.SelectPageItem:
            return {
                ...state,
                currentSectionItem: action.payload
            };
    }
    return state;
}
