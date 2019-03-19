import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/store';
import * as fromEditor from './editor.reducer';

export interface State extends fromRoot.State {
    editor: fromEditor.EditorState;
}

const getEditorFeatureState = createFeatureSelector<fromEditor.EditorState>('editor');

export const getIsDirty = createSelector(
    getEditorFeatureState,
    state => state.dirty
);

// export const getCategories = createSelector(
//     getEditorFeatureState,
//     state => state.categories
// );

export const getCurrentSectionItem = createSelector(
    getEditorFeatureState,
    state => state.currentSectionItem
);

export const getAddNewSectionMode = createSelector(
    getEditorFeatureState,
    state => state.showNewBlockSelector
);

export const getBlocksSchema = createSelector(
    getEditorFeatureState,
    state => state.blocksSchema
);

export const getPage = createSelector(
    getEditorFeatureState,
    state => state.page
);

export const getPageLoading = createSelector(
    getEditorFeatureState,
    state => state.pageLoading
);

export const getSchemaLoading = createSelector(
    getEditorFeatureState,
    state => state.schemaLoading
);

export const getSchemaNotLoaded = createSelector(
    getEditorFeatureState,
    state => state.schemaNotLoaded
);

export const getPageNotLoaded = createSelector(
    getEditorFeatureState,
    state => !state.schemaNotLoaded && state.pageNotLoaded
);

export const getHoveredId = createSelector(
    getEditorFeatureState,
    state => state.hoveredInPreviewId
);
