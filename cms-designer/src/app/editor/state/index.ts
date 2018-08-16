import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromEditor from './editor.reducer';

export interface State extends fromRoot.State {
    editor: fromEditor.EditorState;
}

const getEditorFeatureState = createFeatureSelector<fromEditor.EditorState>('editor');

export const getCurrentThemeItem = createSelector(
    getEditorFeatureState,
    state => state.currentThemeItem
);

export const getShowPresetsEditor = createSelector(
    getEditorFeatureState,
    state => state.showPresetsEditor
);

// export const getCurrentProduct = createSelector(
//     getEditorFeatureState,
//     getCurrentProductId,
//     (state, currentProductId) => {
//         if (currentProductId === 0) {
//             return {
//                 id: 0,
//                 productName: '',
//                 productCode: 'New',
//                 description: '',
//                 starRating: 0
//             };
//         } else {
//             return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
//         }
//     }
// );

export const getPresets = createSelector(
    getEditorFeatureState,
    state => state.presets
);

export const getSettings = createSelector(
    getEditorFeatureState,
    state => state.settings
);

export const getError = createSelector(
    getEditorFeatureState,
    state => state.error
);

export const getCurrentTheme = createSelector(
    getEditorFeatureState,
    state => state.currentTheme
);
