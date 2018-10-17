import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';

import * as fromRoot from '../../state';
import * as rootActions from '../../state/root.actions';
import * as fromEditor from '../../modules/editor/state';
import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromTheme from '../../modules/theme/state';
import * as themeActions from '../../modules/theme/state/theme.actions';

import { PresetsModel } from '../../modules/theme/models/presets.model';
import { PageModel } from '../../modules/editor/models/page.model';
import { SectionModel } from '../../modules/editor/models/section.model';
import { BlockType } from '../../modules/editor/models/block-type.model';
import { SortEvent } from '../../modules/shared/draggable';
import { SchemaItemModel } from 'src/app/modules/theme/models/schema-item.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    // page editor states
    currentSectionItem$: Observable<SectionModel>;
    addNewSectionMode$: Observable<boolean>;
    blockTypes$: Observable<BlockType[]>;
    page$: Observable<PageModel>;

    // theme editor states
    presets$: Observable<PresetsModel>;
    schema$: Observable<SchemaItemModel[]>;
    theme$: Observable<{ [key: string]: string | number | boolean }>;
    currentSchemaItem$: Observable<SchemaItemModel>;
    showPresets$: Observable<boolean>;

    // combined states
    isLoading$: Observable<boolean>;
    isEditMode$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.store.dispatch(new rootActions.LoadData());
        // page editor
        this.store.dispatch(new editorActions.LoadBlockTypes());

        this.currentSectionItem$ = this.store.pipe(select(fromEditor.getCurrentSectionItem));
        this.addNewSectionMode$ = this.store.pipe(select(fromEditor.getAddNewSectionMode));
        this.blockTypes$ = this.store.pipe(select(fromEditor.getBlockTypes));
        this.page$ = this.store.pipe(select(fromEditor.getPage));

        this.presets$ = this.store.pipe(select(fromTheme.getPresets));
        this.schema$ = this.store.pipe(select(fromTheme.getSchema));
        this.theme$ = this.store.pipe(select(fromTheme.getEditableTheme));
        this.currentSchemaItem$ = this.store.pipe(select(fromTheme.getCurrentSchemaItem));
        this.showPresets$ = this.store.pipe(select(fromTheme.getShowPresetsEditor));

        // combined states

        const pageLoading$ = this.store.pipe(select(fromEditor.getPageLoading));
        const schemaLoading$ = this.store.pipe(select(fromTheme.getSchemaLoading));
        const presetsLoading$ = this.store.pipe(select(fromTheme.getPresetsLoading));

        this.isLoading$ = combineLatest(
            pageLoading$,
            schemaLoading$,
            presetsLoading$,
            (pageLoading, schemaLoading, presetsLoading) => pageLoading || schemaLoading || presetsLoading);
        this.isEditMode$ = combineLatest(
            this.currentSectionItem$,
            this.addNewSectionMode$,
            this.showPresets$,
            this.currentSchemaItem$,
            (currentSectionItem, addNewSectionMode, showPresets, currentSchemaItem) =>
                !!currentSectionItem || !!addNewSectionMode || !!showPresets || !!currentSchemaItem);

    }

    //#region theme editor actions

    selectSchemaItem(item: SchemaItemModel) {
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
        this.store.dispatch(new themeActions.TogglePresetsPane(true));
    }

    turnOffPresets() {
        this.store.dispatch(new themeActions.TogglePresetsPane(false));
    }

    liveUpdateTheme(themeValues: {[key: string]: string|number|boolean}) {
        this.store.dispatch(new themeActions.UpdateTheme(themeValues));
    }

    //#endregion

    //#region page editor actions

    selectPageItem(item: SectionModel) {
        this.store.dispatch(new editorActions.SelectPageItem(item));
    }

    setNewBlockMode(visible) {
        this.store.dispatch(new editorActions.ToggleNewBlockPane(visible));
        if (!visible) {
            this.store.dispatch(new editorActions.PreviewPageItem(null));
        }
    }

    completeEditBlock(event: SectionModel) {
        this.store.dispatch(new editorActions.UpdatePageItem(event));
    }

    previewBlockType(type: BlockType) {
        this.store.dispatch(new editorActions.PreviewPageItem(type));
    }

    updateBlockPreview(item: SectionModel) {
        this.store.dispatch(new editorActions.UpdateBlockPreview(item));
    }

    selectBlockType(item: BlockType) {
        this.store.dispatch(new editorActions.CreatePageItem(item));
    }

    onOrderChanged(event: SortEvent) {
        this.store.dispatch(new editorActions.OrderChanged(event));
    }

    removeBlock(item: SectionModel) {
        this.store.dispatch(new editorActions.RemovePageItem(item));
    }
    //#endregion

    saveChanges() {
        this.store.dispatch(new rootActions.SaveData());
    }

    clearChanges() {
        this.store.dispatch(new rootActions.ResetData());
    }
}
