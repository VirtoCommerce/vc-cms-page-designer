import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { CdkDragSortEvent } from '@angular/cdk/drag-drop';

import * as fromRoot from '@app/store';
import * as rootActions from '@app/store/root.actions';

import * as fromEditor from '@editor/store';
import * as editorActions from '@editor/store/editor.actions';

import * as fromTheme from '@themes/store';
import * as themeActions from '@themes/store/theme.actions';

import { BlockValuesModel, BlockSchema } from '@shared/models';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'cms-designer';
    viewMode = 'desktop';

    themeActions = [
        { title: 'Edit HTML/CSS', icon: 'html', type: 'html' },
        { title: 'Edit languages', icon: 'lang', type: 'lang' },
        { title: 'Edit navigation', icon: 'nav', type: 'nav' }
    ];

    storeUrl$ = this.store.select(fromRoot.getPreviewUrl).pipe(
        map(x => !!x ? this.sanitizer.bypassSecurityTrustResourceUrl(x) : null)
    );

    // page editor states
    currentSectionItem$ = this.store.select(fromEditor.getCurrentSectionItem);
    addNewSectionMode$ = this.store.select(fromEditor.getAddNewSectionMode);
    blocksSchema$ = this.store.select(fromEditor.getBlocksSchema);
    page$ = this.store.select(fromEditor.getPage);
    schemaNotLoaded$ = this.store.select(fromEditor.getSchemaNotLoaded);
    pageNotLoaded$ = this.store.select(fromEditor.getPageNotLoaded);
    hoveredId$ = this.store.select(fromEditor.getHoveredId);
    currentBlockName$ = this.store.select(fromEditor.getCurrentBlockName);

    // theme editor states
    presets$ = this.store.select(fromTheme.getPresets);
    themeSchema$ = this.store.select(fromTheme.getSchema);
    theme$ = this.store.select(fromTheme.getEditableTheme);
    currentThemeSchemaItem$ = this.store.select(fromTheme.getCurrentThemeSchemaItem);
    showPresets$ = this.store.select(fromTheme.getShowPresetsEditor);
    presetsNotLoaded$ = this.store.select(fromTheme.getPresetsNotLoaded);
    themeSchemaNotLoaded$ = this.store.select(fromTheme.getSchemaNotLoaded);

    // combined & common states
    primaryId$ = this.store.select(fromRoot.getPrimaryFrameId);
    headerActive$ = this.store.select(fromRoot.getHeaderIsActive);
    headerIcon$ = this.store.select(fromRoot.getHeaderIcon);
    tabsVisible$ = this.store.select(fromRoot.getIsTabVisible);
    isLoading$ = this.store.select(fromRoot.getIsLoading);
    isEditMode$ = this.store.select(fromRoot.getIsEditMode);
    isDirty$ = this.store.select(fromRoot.getIsDirty);
    previewLoading$ = this.store.select(fromRoot.getPreviewLoading);
    activeTabIndex$ = this.store.select(fromRoot.getActiveTabIndex);
    pageTitle$ = this.store.select(fromEditor.getPageTitle);
    hasUndo$ = of(true);
    hasRedo$ = of(false);

    private subscription: Subscription;

    constructor(private store: Store<fromRoot.State>,
        private editorStore: Store<fromEditor.State>,
        private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.store.dispatch(new rootActions.LoadData());
    }

    onPreviewLoaded(source: string) {
        this.store.dispatch(new rootActions.PreviewReady(source));
    }

    back() {
        this.store.dispatch(new rootActions.CloseEditors());
    }

    onThemeActionSelected(type: string) {
        // TODO:
        console.log(type);
    }

    onTabChanged(index) {
        this.store.dispatch(new rootActions.TabIndexChanged(index));
    }

    onSave() {
        this.store.dispatch(new rootActions.SaveData());
    }

    undo() {
        console.log('undo');
    }

    redo() {
        console.log('redo');
    }

    // editor tab events

    mouseOverItem(item) {
        this.store.dispatch(new editorActions.HighlightInPreview(item));
    }

    selectPageItem(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.SelectPageItem(item));
    }

    reloadEditorData() {
        this.store.dispatch(new rootActions.LoadData());
    }

    onOrderChanged(event: CdkDragSortEvent<BlockValuesModel>) {
        this.store.dispatch(new editorActions.OrderChanged(event));
    }

    // block editor pane events

    updateBlockPreview(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.UpdatePageItem(item));
        this.store.dispatch(new editorActions.UpdateBlockPreview(item));
    }

    removeBlock(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.RemovePageItem(item));
    }

    copyBlock(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.CopyPageItem(item));
    }

    toggleVisibility(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.ToggleItemVisibility(item));
    }

    // add new block pane events

    setNewBlockMode() {
        this.store.dispatch(new editorActions.ToggleNewBlockPane(true));
    }

    previewBlockType(type: BlockSchema) {
        this.store.dispatch(new editorActions.PreviewPageItemOfType(type));
    }

    selectBlockType(item: BlockSchema) {
        this.store.dispatch(new editorActions.CreatePageItem(item));
    }

    // theme tab events

    turnOnPresets() {
        this.store.dispatch(new themeActions.ShowPresetsPane());
    }

    reloadThemeData() {
        this.store.dispatch(new rootActions.LoadData());
    }

    selectSchemaItem(item: BlockSchema) {
        this.store.dispatch(new themeActions.SelectSchemaItem(item));
    }

    // presets pane events

    onSavePreset(name: string) {
        this.store.dispatch(new themeActions.CreatePreset(name));
    }

    onSelectPreset(name: string) {
        this.store.dispatch(new themeActions.SelectPreset(name));
    }

    applyPresetAsTheme(name: string) {
        this.store.dispatch(new themeActions.ApplyPreset(name));
    }

    onRemovePreset(name: string) {
        this.store.dispatch(new themeActions.RemovePreset(name));
    }

    // theme editor pane events

    liveUpdateTheme(themeValues: { [key: string]: string | number | boolean }) {
        this.store.dispatch(new themeActions.UpdateTheme(themeValues));
    }
}
