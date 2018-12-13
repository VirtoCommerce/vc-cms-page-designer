import { BlocksSchema } from './../../modules/shared/models/block.schema';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../state';
import * as rootActions from '../../state/root.actions';
import * as fromEditor from '../../modules/editor/state';
import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromTheme from '../../modules/theme/state';
import * as themeActions from '../../modules/theme/state/theme.actions';

import { SortEvent } from '../../modules/shared/components';
import { PageModel } from '../../modules/editor/models/';
import { PresetsModel } from '../../modules/theme/models/';
import { BlockSchema, BlockValuesModel, ValueType } from 'src/app/modules/shared/models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    // page editor states
    currentSectionItem$: Observable<BlockValuesModel>;
    addNewSectionMode$: Observable<boolean>;
    blocksSchema$: Observable<BlocksSchema>;
    page$: Observable<PageModel>;

    // theme editor states
    presets$: Observable<PresetsModel>;
    themeSchema$: Observable<BlockSchema[]>;
    theme$: Observable<{ [key: string]: ValueType }>;
    currentThemeSchemaItem$: Observable<BlockSchema>;
    showPresets$: Observable<boolean>;

    // combined states
    isPreviewLoading: Observable<boolean>;
    isLoading$: Observable<boolean>;
    isEditMode$: Observable<boolean>;
    isDirty$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.store.dispatch(new rootActions.LoadData());
        this.store.dispatch(new editorActions.LoadBlockTypes());

        this.currentSectionItem$ = this.store.pipe(select(fromEditor.getCurrentSectionItem));
        this.addNewSectionMode$ = this.store.pipe(select(fromEditor.getAddNewSectionMode));
        this.blocksSchema$ = this.store.pipe(select(fromEditor.getBlocksSchema));
        this.page$ = this.store.pipe(select(fromEditor.getPage));

        this.presets$ = this.store.pipe(select(fromTheme.getPresets));
        this.themeSchema$ = this.store.pipe(select(fromTheme.getSchema));
        this.theme$ = this.store.pipe(select(fromTheme.getEditableTheme));
        this.currentThemeSchemaItem$ = this.store.pipe(select(fromTheme.getCurrentThemeSchemaItem));
        this.showPresets$ = this.store.pipe(select(fromTheme.getShowPresetsEditor));

        // combined states

        this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
        this.isEditMode$ = this.store.pipe(select(fromRoot.getIsEditMode));
        this.isDirty$ = this.store.pipe(select(fromRoot.getIsDirty));

    }

    //#region theme editor actions

    selectSchemaItem(item: BlockSchema) {
        this.store.dispatch(new themeActions.SelectSchemaItem(item));
    }

    closeThemeItemEditor() {
        this.store.dispatch(new themeActions.SelectSchemaItem(null));
    }

    onRemovePreset(name: string) {
        this.store.dispatch(new themeActions.RemovePreset(name));
    }

    onSelectPreset(name: string) {
        this.store.dispatch(new themeActions.SelectPreset(name));
    }

    onSavePreset(name: string) {
        this.store.dispatch(new themeActions.CreatePreset(name));
    }

    turnOnPresets() {
        this.store.dispatch(new themeActions.ShowPresetsPane());
    }

    turnOffPresets() {
        this.store.dispatch(new themeActions.CancelPreset());
    }

    liveUpdateTheme(themeValues: {[key: string]: string|number|boolean}) {
        this.store.dispatch(new themeActions.UpdateTheme(themeValues));
    }

    applyPresetAsTheme(name: string) {
        this.store.dispatch(new themeActions.ApplyPreset(name));
    }

    //#endregion

    //#region page editor actions

    selectPageItem(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.SelectPageItem(item));
    }

    setNewBlockMode(visible) {
        this.store.dispatch(new editorActions.ToggleNewBlockPane(visible));
        if (!visible) {
            this.store.dispatch(new editorActions.PreviewPageItemOfType(null));
        }
    }

    completeEditBlock() {
        this.store.dispatch(new editorActions.CompleteEditPageItem());
    }

    previewBlockType(type: BlockSchema) {
        this.store.dispatch(new editorActions.PreviewPageItemOfType(type));
    }

    updateBlockPreview(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.UpdatePageItem(item));
        this.store.dispatch(new editorActions.UpdateBlockPreview(item));
    }

    selectBlockType(item: BlockSchema) {
        this.store.dispatch(new editorActions.CreatePageItem(item));
    }

    onOrderChanged(event: SortEvent) {
        this.store.dispatch(new editorActions.OrderChanged(event));
    }

    removeBlock(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.RemovePageItem(item));
    }

    copyBlock(item: BlockValuesModel) {
        // this.store.dispatch(new editorActions.AddPageItem(item));
    }

    //#endregion

    saveChanges() {
        this.store.dispatch(new rootActions.SaveData());
    }

    clearChanges() {
        this.store.dispatch(new rootActions.ResetData());
    }

    previewLoaded(name: string) {
        this.store.dispatch(new editorActions.PreviewReady(name));
    }
}
