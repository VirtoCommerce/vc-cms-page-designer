import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';

import * as fromEditor from '../../modules/editor/state';
import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromTheme from '../../modules/theme/state';
import * as themeActions from '../../modules/theme/state/theme.actions';

import { PresetsModel } from '../../modules/theme/models/presets.model';
import { PageModel } from '../../modules/editor/models/page.model';
import { SectionModel } from '../../modules/editor/models/section.model';
import { BlockType } from '../../modules/editor/models/block-type.model';
import { SortEvent } from '../../modules/shared/draggable';
import { PageDescriptor } from 'src/app/modules/editor/models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    // page editor states
    currentSectionItem$: Observable<SectionModel>;
    addNewSectionMode$: Observable<boolean>;
    blockTypes$: Observable<any>;
    page$: Observable<PageModel>;

    // theme editor states
    presets$: Observable<PresetsModel>;
    schema$: Observable<any[]>;
    theme$: Observable<any>;
    currentThemeItem$: Observable<any>;
    showPresets$: Observable<boolean>;

    // combined states
    isLoading$: Observable<boolean>;

    private params: PageDescriptor;

    constructor(private store: Store<fromEditor.State>, private route: ActivatedRoute) { }

    ngOnInit() {
        // page editor
        this.route.queryParams.subscribe(x => {
            if (x.storeId && x.path) {
                this.params = <PageDescriptor>x;
                this.store.dispatch(new editorActions.LoadPage(this.params));
            }
        });
        this.store.dispatch(new editorActions.LoadBlockTypes());

        this.currentSectionItem$ = this.store.pipe(select(fromEditor.getCurrentSectionItem));
        this.addNewSectionMode$ = this.store.pipe(select(fromEditor.getAddNewSectionMode));
        this.blockTypes$ = this.store.pipe(select(fromEditor.getBlockTypes));
        this.page$ = this.store.pipe(select(fromEditor.getPage));

        // theme editor
        this.store.dispatch(new themeActions.LoadPresets());
        this.store.dispatch(new themeActions.LoadSchema());

        this.presets$ = this.store.pipe(select(fromTheme.getPresets));
        this.schema$ = this.store.pipe(select(fromTheme.getSchema));
        this.theme$ = this.store.pipe(select(fromTheme.getCurrentTheme));
        this.currentThemeItem$ = this.store.pipe(select(fromTheme.getCurrentThemeItem));
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
    }

    //#region theme editor actions

    selectThemeItem(item: any) {
        this.store.dispatch(new themeActions.SelectThemeItem(item));
    }

    turnOnPresets() {
        this.store.dispatch(new themeActions.TogglePresetsPane(true));
    }

    turnOffPresets() {
        this.store.dispatch(new themeActions.TogglePresetsPane(false));
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
        this.store.dispatch(new editorActions.SavePage(this.params));
    }

    clearChanges() {
        this.store.dispatch(new editorActions.ClearChanges());
    }
}
