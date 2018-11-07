import { ThemeActionTypes, ThemeActions, CreatePreset, SaveThemeSuccess } from './theme.actions';
import { PresetsModel } from '../models/presets.model';
import { SchemaItemModel } from '../models/schema-item.model';

export interface ThemeState {
    showPresetsEditor: boolean;
    error: string;
    schemaLoading: boolean;
    presetsLoading: boolean;
    selectedSchemaItem: SchemaItemModel; // this section corresponds to section from schema
    editableTheme: { [key: string]: string | number | boolean }; // the current theme
    presets: PresetsModel; // the whole presets file which used as transport for preview
    initialPresets: string; // initial file with presets and theme as string
    schema: SchemaItemModel[]; // the settings schema
    dirty: boolean;
}

export const initialState: ThemeState = {
    showPresetsEditor: false,
    selectedSchemaItem: null,
    error: '',
    schemaLoading: false,
    presetsLoading: false,
    editableTheme: {},
    presets: null,
    initialPresets: null,
    schema: [],
    dirty: false
};

export function reducer(state = initialState, action: ThemeActions): ThemeState {
    switch (action.type) {
        case ThemeActionTypes.LoadSchemaSuccess:
            return {
                ...state,
                schema: action.payload
            };
        case ThemeActionTypes.LoadSchemaFail:
            return {
                ...state,
                error: action.payload
            };
        case ThemeActionTypes.SaveThemeSuccess: {
            return {
                ...state,
                initialPresets: JSON.stringify(state.presets),
                dirty: false
            };
        }
        case ThemeActionTypes.SaveTheme: {
            // executes before saving
            const newPreset = { ...state.presets };
            newPreset.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPreset
            };
        }
        case ThemeActionTypes.LoadThemesSuccess: {
            const currentTheme = typeof action.payload.current === 'string'
                ? action.payload.presets[action.payload.current]
                : action.payload.current;
            const newPresets = action.payload;
            newPresets.current = currentTheme;
            return {
                ...state,
                editableTheme: { ...currentTheme },
                initialPresets: JSON.stringify(action.payload),
                presets: newPresets
            };
        }
        case ThemeActionTypes.LoadThemesFail:
            return {
                ...state,
                error: action.payload
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
        case ThemeActionTypes.CancelPreset: {
            const newPresets = { ...state.presets };
            newPresets.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPresets,
                showPresetsEditor: false
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
            const currentTheme = typeof state.presets.current === 'string'
                ? newPresets[state.presets.current]
                : newPresets.current;
            newPresets.current = currentTheme;
            return {
                ...state,
                presets: newPresets,
                editableTheme: { ...currentTheme },
                dirty: false
            };
        }
        case ThemeActionTypes.RemovePreset:
            if (action.payload !== state.presets.current) {
                const newPresets = { ...state.presets };
                delete newPresets.presets[action.payload];
                return {
                    ...state,
                    presets: newPresets,
                    dirty: true
                };
            }
            break;
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
    }
    return state;
}
