import { getShowPresetsEditor } from './../modules/theme/state/index';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from './root.reducer';
import * as fromTheme from 'src/app/modules/theme/state';
import * as fromEditor from 'src/app/modules/editor/state';

export interface State {
    root: fromRoot.RootState;
}

// const getRootFeatureState = createFeatureSelector<fromRoot.RootState>('root');

export const getIsLoading = createSelector(
    fromEditor.getPageLoading,
    fromTheme.getSchemaLoading,
    fromTheme.getPresetsLoading,
    (page, schema, presets) => page || schema || presets
);

export const getIsEditMode = createSelector(
    fromEditor.getCurrentSectionItem,
    fromEditor.getAddNewSectionMode,
    fromTheme.getCurrentThemeSchemaItem,
    fromTheme.getShowPresetsEditor,
    (sectionItem, addSection, schemaItem, presetsEditor) =>
        !!sectionItem || !!addSection || !!schemaItem || !!presetsEditor
);

export const getIsDirty = createSelector(
    fromTheme.getIsDirty,
    fromEditor.getIsDirty,
    (themeDirty, editorDirty) => themeDirty || editorDirty
);
