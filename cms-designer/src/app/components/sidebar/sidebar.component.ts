import { BlocksSchema } from './../../modules/shared/models/block.schema';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../store';
import * as rootActions from '../../store/root.actions';
import * as fromEditor from '../../modules/editor/store';
import * as editorActions from '../../modules/editor/store/editor.actions';
import * as fromTheme from '../../modules/theme/store';
import * as themeActions from '../../modules/theme/store/theme.actions';

import { SortEvent } from '../../modules/shared/components';
import { PageModel } from '../../modules/editor/models/';
import { PresetsModel } from '../../modules/theme/models/';
import { BlockSchema, BlockValuesModel, ValueType } from 'src/app/modules/shared/models';

export class SidebarComponent implements OnInit {

    // page editor states
    currentSectionItem$ = this.store.pipe(select(fromEditor.getCurrentSectionItem));
    addNewSectionMode$ = this.store.pipe(select(fromEditor.getAddNewSectionMode));
    blocksSchema$ = this.store.pipe(select(fromEditor.getBlocksSchema));
    page$ = this.store.pipe(select(fromEditor.getPage));
    schemaNotLoaded$ = this.store.pipe(select(fromEditor.getSchemaNotLoaded));
    pageNotLoaded$ = this.store.pipe(select(fromEditor.getPageNotLoaded));

    // theme editor states
    presets$ = this.store.pipe(select(fromTheme.getPresets));
    themeSchema$ = this.store.pipe(select(fromTheme.getSchema));
    theme$ = this.store.pipe(select(fromTheme.getEditableTheme));
    currentThemeSchemaItem$ = this.store.pipe(select(fromTheme.getCurrentThemeSchemaItem));
    showPresets$ = this.store.pipe(select(fromTheme.getShowPresetsEditor));
    presetsNotLoaded$ = this.store.pipe(select(fromTheme.getPresetsNotLoaded));
    themeSchemaNotLoaded$ = this.store.pipe(select(fromTheme.getSchemaNotLoaded));

    // combined states
    isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    isEditMode$ = this.store.pipe(select(fromRoot.getIsEditMode));
    isDirty$ = this.store.pipe(select(fromRoot.getIsDirty));

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.store.dispatch(new rootActions.LoadData());
    }

    //#region theme editor actions

    // selectSchemaItem(item: BlockSchema) {
    //     this.store.dispatch(new themeActions.SelectSchemaItem(item));
    // }

    // closeThemeItemEditor() {
    //     this.store.dispatch(new themeActions.SelectSchemaItem(null));
    // }

    // onRemovePreset(name: string) {
    //     this.store.dispatch(new themeActions.RemovePreset(name));
    // }

    // onSelectPreset(name: string) {
    //     this.store.dispatch(new themeActions.SelectPreset(name));
    // }

    // onSavePreset(name: string) {
    //     this.store.dispatch(new themeActions.CreatePreset(name));
    // }

    // turnOnPresets() {
    //     this.store.dispatch(new themeActions.ShowPresetsPane());
    // }

    // turnOffPresets() {
    //     this.store.dispatch(new themeActions.CancelPreset());
    // }

    // liveUpdateTheme(themeValues: { [key: string]: string | number | boolean }) {
    //     this.store.dispatch(new themeActions.UpdateTheme(themeValues));
    // }

    // applyPresetAsTheme(name: string) {
    //     this.store.dispatch(new themeActions.ApplyPreset(name));
    // }

    // reloadThemeData() {
    //     this.store.dispatch(new rootActions.LoadData());
    // }

    //#endregion

    //#region page editor actions

    // selectPageItem(item: BlockValuesModel) {
    //     this.store.dispatch(new editorActions.SelectPageItem(item));
    // }

    // reloadEditorData() {
    //     this.store.dispatch(new rootActions.LoadData());
    // }

    // onOrderChanged(event: SortEvent) {
    //     this.store.dispatch(new editorActions.OrderChanged(event));
    // }

    // setNewBlockMode(visible) {
    //     this.store.dispatch(new editorActions.ToggleNewBlockPane(visible));
    //     if (!visible) {
    //         this.store.dispatch(new editorActions.PreviewPageItemOfType(null));
    //     }
    // }

    // completeEditBlock() {
    //     this.store.dispatch(new editorActions.CompleteEditPageItem());
    // }

    // previewBlockType(type: BlockSchema) {
    //     this.store.dispatch(new editorActions.PreviewPageItemOfType(type));
    // }

    // updateBlockPreview(item: BlockValuesModel) {
    //     this.store.dispatch(new editorActions.UpdatePageItem(item));
    //     this.store.dispatch(new editorActions.UpdateBlockPreview(item));
    // }

    // selectBlockType(item: BlockSchema) {
    //     this.store.dispatch(new editorActions.CreatePageItem(item));
    // }

    // removeBlock(item: BlockValuesModel) {
    //     this.store.dispatch(new editorActions.RemovePageItem(item));
    // }

    // copyBlock(item: BlockValuesModel) {
    //     this.store.dispatch(new editorActions.CopyPageItem(item));
    // }

    //#endregion

    saveChanges() {
        this.store.dispatch(new rootActions.SaveData());
    }

    clearChanges() {
        this.store.dispatch(new rootActions.ResetData());
    }

    previewLoaded(name: string) {
        this.store.dispatch(new rootActions.PreviewReady(name));
    }
}
