import { ApiUrlsService } from './services/api-url.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import * as fromRoot from './store';
import * as fromEditor from './modules/editor/store';
import * as fromTheme from './modules/theme/store';
import * as rootActions from './store/root.actions';
import * as editorActions from './modules/editor/store/editor.actions';
import * as themeActions from './modules/theme/store/theme.actions';
import { BlockValuesModel, BlockSchema } from './modules/shared/models';
import { SortEvent } from './modules/shared/components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'cms-designer';
    storeUrl$: SafeUrl; // TODO: get via selector
    viewMode = 'desktop';

    themeActions = [
        { title: 'Edit HTML/CSS', icon: 'html', type: 'html' },
        { title: 'Edit languages', icon: 'lang', type: 'lang' },
        { title: 'Edit navigation', icon: 'nav', type: 'nav' }
    ];

    // page editor states
    currentSectionItem$ = this.store.select(fromEditor.getCurrentSectionItem);
    addNewSectionMode$ = this.store.select(fromEditor.getAddNewSectionMode);
    blocksSchema$ = this.store.select(fromEditor.getBlocksSchema);
    page$ = this.store.select(fromEditor.getPage);
    schemaNotLoaded$ = this.store.select(fromEditor.getSchemaNotLoaded);
    pageNotLoaded$ = this.store.select(fromEditor.getPageNotLoaded);

    // theme editor states
    presets$ = this.store.select(fromTheme.getPresets);
    themeSchema$ = this.store.select(fromTheme.getSchema);
    theme$ = this.store.select(fromTheme.getEditableTheme);
    currentThemeSchemaItem$ = this.store.select(fromTheme.getCurrentThemeSchemaItem);
    showPresets$ = this.store.select(fromTheme.getShowPresetsEditor);
    presetsNotLoaded$ = this.store.select(fromTheme.getPresetsNotLoaded);
    themeSchemaNotLoaded$ = this.store.select(fromTheme.getSchemaNotLoaded);

    // combined states
    headerActive$ = this.store.select(fromRoot.getHeaderIsActive);
    headerIcon$ = this.store.select(fromRoot.getHeaderIcon);
    tabsVisible$ = this.store.select(fromRoot.getIsTabVisible);
    isLoading$ = this.store.select(fromRoot.getIsLoading);
    isEditMode$ = this.store.select(fromRoot.getIsEditMode);
    isDirty$ = this.store.select(fromRoot.getIsDirty);
    previewLoading$ = this.store.select(fromRoot.getPreviewLoading);
    activeTabIndex$ = this.store.select(fromRoot.getActiveTabIndex);
    hasUndo$ = of(true);
    hasRedo$ = of(false);

    private subscription: Subscription;

    constructor(private store: Store<fromRoot.State>, private editorStore: Store<fromEditor.State>, private urls: ApiUrlsService) { }

    ngOnInit(): void {
        this.store.dispatch(new rootActions.LoadData());
        // this.subscription = this.editorStore.pipe(select(fromEditor.getPage)).pipe(
        //     filter(x => !!x),
        //     distinctUntilChanged((x, y) => x.settings['layout'] === y.settings['layout'])
        // ).subscribe(x => {
        //     this.storeUrl = this.urls.getStoreUrl(<string>x.settings['layout']);
        // });
    }

    ngOnDestroy() {
        // if (this.subscription !== null) {
        //     this.subscription.unsubscribe();
        //     this.subscription = null;
        // }
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

    undo() {
        console.log('undo');
    }

    redo() {
        console.log('redo');
    }

    // editor tab events

    selectPageItem(item: BlockValuesModel) {
        this.store.dispatch(new editorActions.SelectPageItem(item));
    }

    reloadEditorData() {
        this.store.dispatch(new rootActions.LoadData());
    }

    onOrderChanged(event: SortEvent) {
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
