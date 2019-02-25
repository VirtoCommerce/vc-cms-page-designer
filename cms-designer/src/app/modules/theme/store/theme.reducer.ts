import { ThemeActionTypes, ThemeActions } from './theme.actions';
import { PresetsModel } from '@themes/models';
import { BlockSchema, ValueType } from '@shared/models';

export interface ThemeState {
    schemaLoading: boolean;
    schemaNotLoaded: boolean;
    presetsLoading: boolean;
    presetsNotLoaded: boolean;
    draftUploaded: boolean;
    uploadDraftFail: boolean;

    showPresetsEditor: boolean;
    selectedSchemaItem: BlockSchema; // this section corresponds to section from schema
    editableTheme: { [key: string]: ValueType }; // the current theme
    presets: PresetsModel; // the whole presets file which used as transport for preview
    initialPresets: string; // initial file with presets and theme as string
    schema: BlockSchema[]; // the settings schema
    dirty: boolean;
}

export const initialState: ThemeState = {
    schemaLoading: false,
    schemaNotLoaded: false,
    presetsLoading: false,
    presetsNotLoaded: false,
    draftUploaded: false,
    uploadDraftFail: false,

    showPresetsEditor: false,
    selectedSchemaItem: null,
    editableTheme: null,
    presets: null,
    initialPresets: null,
    schema: null,
    dirty: false
};

export function reducer(state = initialState, action: ThemeActions): ThemeState {
    switch (action.type) {
        case ThemeActionTypes.LoadSchema:
            return {
                ...state,
                schemaLoading: true
            };
        case ThemeActionTypes.LoadSchemaSuccess:
            return {
                ...state,
                schema: action.payload,
                schemaLoading: false,
                schemaNotLoaded: false
            };
        case ThemeActionTypes.LoadSchemaFail:
            return {
                ...state,
                schemaLoading: false,
                schemaNotLoaded: true
            };
        case ThemeActionTypes.SaveTheme: {
            const newPreset = { ...state.presets };
            newPreset.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPreset
            };
        }
        case ThemeActionTypes.SaveThemeSuccess: {
            return {
                ...state,
                initialPresets: JSON.stringify(state.presets),
                dirty: false
            };
        }
        case ThemeActionTypes.LoadThemes: {
            return {
                ...state,
                presetsLoading: true
            };
        }
        case ThemeActionTypes.LoadThemesSuccess: {
            const newPresets = action.payload;
            if (typeof action.payload.current === 'string') {
                newPresets.current = { ...action.payload.presets[action.payload.current] };
            }
            return {
                ...state,
                editableTheme: { ...<any>newPresets.current },
                initialPresets: JSON.stringify(action.payload),
                presets: newPresets,
                presetsLoading: false,
                presetsNotLoaded: false
            };
        }
        case ThemeActionTypes.LoadThemesFail:
            return {
                ...state,
                presetsLoading: false,
                presetsNotLoaded: true
            };
        case ThemeActionTypes.SelectSchemaItem:
            return {
                ...state,
                selectedSchemaItem: action.payload
            };
        case ThemeActionTypes.ShowPresetsPane:
            return {
                ...state,
                showPresetsEditor: true
            };
        case ThemeActionTypes.CloseEditors:
        case ThemeActionTypes.CancelPreset: {
            const newPresets = { ...state.presets };
            newPresets.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPresets,
                showPresetsEditor: false,
                selectedSchemaItem: null
            };
        }
        case ThemeActionTypes.ApplyPreset: {
            const newTheme = { ...state.presets.presets[action.payload] };
            const newPresets = { ...state.presets };
            newPresets.current = newTheme;
            return {
                ...state,
                editableTheme: newTheme,
                presets: newPresets,
                showPresetsEditor: false,
                dirty: true
            };
        }
        case ThemeActionTypes.UpdateTheme: {
            const currentTheme = { ...state.editableTheme, ...action.payload };
            const newPresets = { ...state.presets };
            newPresets.current = { ...currentTheme };
            return {
                ...state,
                editableTheme: currentTheme,
                presets: newPresets,
                dirty: true
            };
        }
        case ThemeActionTypes.ClearThemeChanges: {
            const newPresets = JSON.parse(state.initialPresets);
            if (typeof newPresets.current === 'string') {
                newPresets.current = { ...newPresets.presets[newPresets.current] };
            }
            return {
                ...state,
                presets: newPresets,
                editableTheme: { ...newPresets.current },
                dirty: false,
                draftUploaded: false
            };
        }
        case ThemeActionTypes.RemovePreset: {
            const newPresets = { ...state.presets };
            delete newPresets.presets[action.payload];
            return {
                ...state,
                presets: newPresets,
                dirty: true
            };
        }
        case ThemeActionTypes.CreatePreset: {
            const newPresets = { ...state.presets };
            newPresets.presets[action.payload] = { ...state.editableTheme };
            newPresets.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPresets,
                dirty: true
            };
        }
        case ThemeActionTypes.SelectPreset: {
            const newPresets = { ...state.presets };
            newPresets.current = { ...newPresets.presets[action.payload] };
            return {
                ...state,
                presets: newPresets
            };
        }
        case ThemeActionTypes.UpdateDraftSuccess: {
            return {
                ...state,
                draftUploaded: true
            };
        }
    }
    return state;
}
