import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromTheme from './theme.reducer';

export interface State extends fromRoot.State {
    theme: fromTheme.ThemeState;
}

const getThemeFeatureState = createFeatureSelector<fromTheme.ThemeState>('theme');

export const getCurrentThemeItem = createSelector(
    getThemeFeatureState,
    state => state.currentThemeItem
);

export const getShowPresetsEditor = createSelector(
    getThemeFeatureState,
    state => state.showPresetsEditor
);

export const getPresets = createSelector(
    getThemeFeatureState,
    state => state.presets
);

export const getSettings = createSelector(
    getThemeFeatureState,
    state => state.settings
);

export const getError = createSelector(
    getThemeFeatureState,
    state => state.error
);

export const getCurrentTheme = createSelector(
    getThemeFeatureState,
    state => state.currentTheme
);
