import { ThemeActionTypes, ThemeActions, CreatePreset } from './theme.actions';
import { PresetsModel } from '../models/presets.model';
import { SchemaItemModel } from '../models/schema-item.model';

export interface ThemeState {
    showPresetsEditor: boolean;
    selectedSchemaItem: SchemaItemModel;
    error: string;
    schemaLoading: boolean;
    presetsLoading: boolean;
    editableTheme: { [key: string]: string | number | boolean };
    presets: PresetsModel;
    initialPresets: string;
    schema: SchemaItemModel[];
}

const initialState: ThemeState = {
    showPresetsEditor: false,
    selectedSchemaItem: null,
    error: '',
    schemaLoading: false,
    presetsLoading: false,
    editableTheme: {},
    presets: null,
    initialPresets: null,
    schema: []
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
        case ThemeActionTypes.SavePresetsSuccess:
            return {
                ...state,
                initialPresets: JSON.stringify(state.presets)
            };
        case ThemeActionTypes.SavePresets: {
            const newPreset = state.presets;
            newPreset.presets[newPreset.current] = { ...state.editableTheme };
            return {
                ...state,
                presets: newPreset,
                initialPresets: JSON.stringify(action.payload)
            };
        }
        case ThemeActionTypes.LoadPresetsSuccess:
            return {
                ...state,
                editableTheme: { ...action.payload.presets[action.payload.current] },
                presets: action.payload,
                initialPresets: JSON.stringify(action.payload)
            };
        case ThemeActionTypes.LoadPresetsFail:
            return {
                ...state,
                error: action.payload
            };
        case ThemeActionTypes.SelectSchemaItem:
            return {
                ...state,
                selectedSchemaItem: action.payload
            };
        case ThemeActionTypes.TogglePresetsPane:
            return {
                ...state,
                showPresetsEditor: action.payload
            };
        case ThemeActionTypes.UpdateTheme:
            return {
                ...state,
                editableTheme: { ...state.editableTheme, ...action.payload }
            };
        case ThemeActionTypes.ClearThemeChanges:
            return {
                ...state,
                presets: JSON.parse(state.initialPresets)
            };
        case ThemeActionTypes.RemovePreset:
            if (action.payload !== state.presets.current) {
                const newPresets = state.presets;
                delete newPresets.presets[action.payload];
                return {
                    ...state,
                    presets: newPresets
                };
            }
            break;
        case ThemeActionTypes.CreatePreset: {
            const newPresets = state.presets;
            newPresets.presets[action.payload] = { ...state.editableTheme };
            newPresets.current = action.payload;
            return {
                ...state,
                presets: newPresets
            };
        }
        case ThemeActionTypes.SelectPreset: {
            const newPresets = state.presets;
            newPresets.presets[newPresets.current] = { ...state.editableTheme };
            newPresets.current = action.payload;
            return {
                ...state,
                editableTheme: { ...newPresets.presets[action.payload] },
                presets: newPresets
            };
        }
    }
    return state;
}
