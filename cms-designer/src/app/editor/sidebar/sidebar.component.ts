import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromEditor from '../state';
import * as editorActions from '../state/editor.actions';

import { PresetsModel } from '../models/themes/presets.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    presets$: Observable<PresetsModel>;
    settings$: Observable<any[]>;
    theme$: Observable<any>;
    currentThemeItem$: Observable<any>;
    showPresets$: Observable<boolean>;

    isPageLoading = false;
    isThemeLoading = false;

    constructor(private store: Store<fromEditor.State>) { }

    ngOnInit() {
        this.store.dispatch(new editorActions.LoadPresets());
        this.store.dispatch(new editorActions.LoadSettings());

        this.presets$ = this.store.pipe(select(fromEditor.getPresets));
        this.settings$ = this.store.pipe(select(fromEditor.getSettings));
        this.theme$ = this.store.pipe(select(fromEditor.getCurrentTheme));

        this.currentThemeItem$ = this.store.pipe(select(fromEditor.getCurrentThemeItem));
        this.showPresets$ = this.store.pipe(select(fromEditor.getShowPresetsEditor));

        this.showPresets$.subscribe(v => {
            console.log(v);
        });
    }

    selectThemeItem(item) {
        this.store.dispatch(new editorActions.SelectThemeItem(item));
    }

    turnOnPresets() {
        this.store.dispatch(new editorActions.TogglePresetsPane(true));
    }

    turnOffPresets() {
        this.store.dispatch(new editorActions.TogglePresetsPane(false));
    }
}
