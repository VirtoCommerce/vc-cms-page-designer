import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from './root.reducer';
import * as fromTheme from 'src/app/modules/theme/store';
import * as fromEditor from 'src/app/modules/editor/store';

export interface State {
    root: fromRoot.RootState;
}

const getRootFeatureState = createFeatureSelector<fromRoot.RootState>('root');

export const getIsLoading = createSelector(
    fromEditor.getPageLoading,
    fromEditor.getSchemaLoading,
    fromTheme.getPresetsLoading,
    fromTheme.getSchemaLoading,
    (page, blocks, presets, schema) => page || blocks || schema || presets
);

export const getIsTabVisible = createSelector(
    fromEditor.getCurrentSectionItem,
    fromEditor.getAddNewSectionMode,
    fromTheme.getShowPresetsEditor,
    fromTheme.getCurrentThemeSchemaItem,
    (section, isAddMode, presets, theme) => !section && !isAddMode && !presets && !theme
);

export const getIsEditMode = createSelector(
    fromEditor.getCurrentSectionItem,
    fromEditor.getAddNewSectionMode,
    fromTheme.getCurrentThemeSchemaItem,
    fromTheme.getShowPresetsEditor,
    (sectionItem, addSection, schemaItem, presetsEditor) =>
        !!sectionItem || !!addSection || !!schemaItem || !!presetsEditor
);

export const getHeaderIsActive = createSelector(
    getIsEditMode,
    mode => mode
);

export const getHeaderIcon = createSelector(
    getIsEditMode,
    fromEditor.getAddNewSectionMode,
    (isEdit, isAdd) => isAdd ? 'close' : isEdit ? 'back' : 'logo'
);

export const getIsDirty = createSelector(
    fromTheme.getIsDirty,
    fromEditor.getIsDirty,
    (themeDirty, editorDirty) => themeDirty || editorDirty
);

export const getPreviewLoading = createSelector(
    getRootFeatureState,
    state => state.previewLoading
);
