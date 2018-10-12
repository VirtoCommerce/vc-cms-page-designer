import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state';
import * as fromTheme from './theme.reducer';

export interface State extends fromRoot.State {
    theme: fromTheme.ThemeState;
}

const getThemeFeatureState = createFeatureSelector<fromTheme.ThemeState>('theme');

export const getCurrentSchemaItem = createSelector(
    getThemeFeatureState,
    state => state.selectedSchemaItem
);

export const getShowPresetsEditor = createSelector(
    getThemeFeatureState,
    state => state.showPresetsEditor
);

export const getSchemaLoading = createSelector(
    getThemeFeatureState,
    state => state.schemaLoading
);

export const getPresetsLoading = createSelector(
    getThemeFeatureState,
    state => state.presetsLoading
);

export const getPresets = createSelector(
    getThemeFeatureState,
    state => state.presets
);

export const getSchema = createSelector(
    getThemeFeatureState,
    state => state.schema
);

export const getError = createSelector(
    getThemeFeatureState,
    state => state.error
);

export const getEditableTheme = createSelector(
    getThemeFeatureState,
    state => state.editableTheme
);
