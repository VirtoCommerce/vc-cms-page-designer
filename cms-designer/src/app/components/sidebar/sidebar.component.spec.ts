import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

import * as fromRoot from '../../state';
import * as rootActions from '../../state/root.actions';
import * as fromEditor from '../../modules/editor/state';
import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromTheme from '../../modules/theme/state';
import * as themeActions from '../../modules/theme/state/theme.actions';
import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Component({ selector: 'app-tab', template: '<div></div>' }) class FakeTabComponent { }

@Component({ selector: 'app-tabs', template: '<div></div>' }) class FakeTabsComponent { }

@Component({ selector: 'app-page-editor', template: '<div></div>' })
class PageEditorStubComponent {
    @Input() model;
    @Output() selectEvent;
    @Output() orderChangedEvent;
    @Output() addNewBlockEvent;
}

@Component({ selector: 'app-theme-editor', template: '<div></div>' })
class ThemeEditorStubComponent {
    @Input() schema;
    @Output() selectPresetEvent;
    @Output() selectItemEvent;
}

@Component({ selector: 'app-page-item-editor', template: '<div></div>' })
class PageItemEditorStubComponent {
    @Input() model;
    @Output() valueChangedEvent;
    @Output() removeBlockEvent;
    @Output() backEvent;
}

@Component({ selector: 'app-select-type', template: '<div></div>' })
class SelectTypeStubComponent {
    @Input() types;
    @Output() selectBlockEvent;
    @Output() previewBlockEvent;
    @Output() backEvent;
}

@Component({ selector: 'app-presets-editor', template: '<div></div>' })
class PresetsEditorStubComponent {
    @Input() data;
    @Input() theme;
    @Output() savePresetEvent;
    @Output() selectPresetEvent;
    @Output() removePresetEvent;
    @Output() backEvent;
}

@Component({ selector: 'app-theme-item-editor', template: '<div></div>' })
class ThemeItemEditorStubComponent {
    @Input() schema;
    @Input() theme;
    @Output() valueChangedEvent;
    @Output() backEvent;
}

describe('SidebarComponent', () => {
    let fixture: ComponentFixture<SidebarComponent>;
    let store;

    beforeEach(() => {
        store = jasmine.createSpyObj(['dispatch']);
        store.subscribe = jasmine.createSpy().and.returnValue(of({}));
        store.pipe = jasmine.createSpy().and.returnValue(of({}));
        TestBed.configureTestingModule({
            declarations: [
                SidebarComponent,
                PageEditorStubComponent,
                ThemeEditorStubComponent,
                PageItemEditorStubComponent,
                SelectTypeStubComponent,
                PresetsEditorStubComponent,
                ThemeItemEditorStubComponent,
                FakeTabComponent,
                FakeTabsComponent
            ],
            providers: [
                { provide: Store, useValue: store }
            ]
        });

        fixture = TestBed.createComponent(SidebarComponent);
    });

    xit('selectSchemaItem', () => {
        // fixture.componentInstance.previewLoaded();
        // expect(store.dispatch).toHaveBeenCalled();
        // expect(store.dispatch).toHaveBeenCalledTimes(1);
        // expect(store.dispatch.calls.argsFor(0)[0] instanceof editorActions.PreviewReady).toBeTruthy();
    });

    xit('closeThemeItemEditor');
    xit('onRemovePreset');
    xit('onSelectPreset');
    xit('onSavePreset');
    xit('turnOnPresets');
    xit('turnOffPresets');
    xit('liveUpdateTheme');
    xit('selectPageItem');
    xit('setNewBlockMode');
    xit('completeEditBlock');
    xit('previewBlockType');
    xit('updateBlockPreview');
    xit('selectBlockType');
    xit('onOrderChanged');
    xit('removeBlock');
    xit('saveChanges');
    xit('clearChanges');
});
