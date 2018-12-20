import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

import * as fromRoot from '../../state';
import * as rootActions from '../../state/root.actions';
import * as fromEditor from '../../modules/editor/state';
import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromTheme from '../../modules/theme/state';
import * as themeActions from '../../modules/theme/state/theme.actions';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PresetsModel } from 'src/app/modules/theme/models';
import { BlockSchema } from 'src/app/modules/shared/models';

@Component({ selector: 'app-tab', template: '<div><ng-content></ng-content></div>' }) class FakeTabComponent { }

@Component({ selector: 'app-tabs', template: '<div></div><ng-content></ng-content>' }) class FakeTabsComponent { }

@Component({ selector: 'app-page-editor', template: '<div></div>' })
class PageEditorStubComponent {
    @Input() model;
    @Input() schema;
    @Input() noSchema;
    @Input() noPage;
    @Output() selectEvent = new EventEmitter<any>();
    @Output() orderChangedEvent = new EventEmitter<any>();
    @Output() addNewBlockEvent = new EventEmitter<any>();
    @Output() reloadPage = new EventEmitter<any>();
    @Output() reloadSchema = new EventEmitter<any>();
}

@Component({ selector: 'app-theme-editor', template: '<div></div>' })
class ThemeEditorStubComponent {
    @Input() schema;
    @Output() selectPresetEvent = new EventEmitter<any>();
    @Output() selectItemEvent = new EventEmitter<any>();
}

@Component({ selector: 'app-page-item-editor', template: '<div></div>' })
class PageItemEditorStubComponent {
    @Input() model;
    @Input() schema;
    @Output() valueChangedEvent = new EventEmitter<any>();
    @Output() removeBlockEvent = new EventEmitter<any>();
    @Output() backEvent = new EventEmitter<any>();
}

@Component({ selector: 'app-select-type', template: '<div></div>' })
class SelectTypeStubComponent {
    @Input() schema;
    @Output() selectBlockEvent = new EventEmitter<any>();
    @Output() previewBlockEvent = new EventEmitter<any>();
    @Output() backEvent = new EventEmitter<any>();
}

@Component({ selector: 'app-presets-editor', template: '<div></div>' })
class PresetsEditorStubComponent {
    @Input() data;
    @Output() savePresetEvent = new EventEmitter<any>();
    @Output() selectPresetEvent = new EventEmitter<any>();
    @Output() removePresetEvent = new EventEmitter<any>();
    @Output() backEvent = new EventEmitter<any>();
}

@Component({ selector: 'app-theme-item-editor', template: '<div></div>' })
class ThemeItemEditorStubComponent {
    @Input() schema;
    @Input() theme;
    @Output() valueChangedEvent = new EventEmitter<any>();
    @Output() backEvent = new EventEmitter<any>();
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
        fixture.detectChanges();
    });

    it('ngOnInit dispatch Load action', () => {

        expect(store.dispatch).toHaveBeenCalled();
        const action = store.dispatch.calls.argsFor(0)[0];
        expect(action instanceof rootActions.LoadData).toBeTruthy();

    });

    it('selectSchemaItem dispatches the SelectSchemaItem action with correct parameters', () => {
        fixture.componentInstance.themeSchema$ = of([]);
        fixture.detectChanges();
        store.dispatch.calls.reset();
        const themeEditor = fixture.debugElement.query(By.directive(ThemeEditorStubComponent));

        const item = <BlockSchema>{
            name: 'test'
        };

        (<ThemeEditorStubComponent>themeEditor.componentInstance).selectItemEvent.emit(item);

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const action = store.dispatch.calls.argsFor(0)[0];
        expect(action instanceof themeActions.SelectSchemaItem).toBeTruthy();
        expect(action.payload === item).toBeTruthy();
    });

    it('closeThemeItemEditor dispatches the SelectSchemaItem action with null', () => {
        // A
        const item = <BlockSchema>{
            name: 'test'
        };
        fixture.componentInstance.currentThemeSchemaItem$ = of(item);
        fixture.detectChanges();
        store.dispatch.calls.reset();
        // A
        const themeItemEditor = fixture.debugElement.query(By.directive(ThemeItemEditorStubComponent));
        (<ThemeItemEditorStubComponent>themeItemEditor.componentInstance).backEvent.emit();
        // A
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const action = store.dispatch.calls.argsFor(0)[0];
        expect(action instanceof themeActions.SelectSchemaItem).toBeTruthy();
        expect(action.payload === null).toBeTruthy();
    });

    it('onRemovePreset dispatches the RemovePreset action with passed to event name', () => {
        // A
        fixture.componentInstance.presets$ = of(<PresetsModel>{
            current: '',
            presets: {
                item: { }
            }
        });
        fixture.componentInstance.showPresets$ = of(true);
        fixture.detectChanges();
        store.dispatch.calls.reset();
        // A
        const presetsEditor = fixture.debugElement.query(By.directive(PresetsEditorStubComponent));
        (<PresetsEditorStubComponent>presetsEditor.componentInstance).removePresetEvent.emit('remove');
        // A
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const action = store.dispatch.calls.argsFor(0)[0];
        expect(action instanceof themeActions.RemovePreset).toBeTruthy();
        expect(action.payload === 'remove').toBeTruthy();
    });

    it('onSelectPreset dispatches the SelectPreset action with passed to event name', () => {
        // A
        fixture.componentInstance.presets$ = of(<PresetsModel>{
            current: '',
            presets: {
                item: { }
            }
        });
        fixture.componentInstance.showPresets$ = of(true);
        fixture.detectChanges();
        store.dispatch.calls.reset();
        // A
        const presetsEditor = fixture.debugElement.query(By.directive(PresetsEditorStubComponent));
        (<PresetsEditorStubComponent>presetsEditor.componentInstance).selectPresetEvent.emit('item');
        // A
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const action = store.dispatch.calls.argsFor(0)[0];
        expect(action instanceof themeActions.SelectPreset).toBeTruthy();
        expect(action.payload === 'item').toBeTruthy();
    });
    it('onSavePreset dispatches the CreatePreset action with passed to event name', () => {
        // A
        fixture.componentInstance.presets$ = of(<PresetsModel>{
            current: '',
            presets: {
                item: { }
            }
        });
        fixture.componentInstance.showPresets$ = of(true);
        fixture.detectChanges();
        store.dispatch.calls.reset();
        // A
        const presetsEditor = fixture.debugElement.query(By.directive(PresetsEditorStubComponent));
        (<PresetsEditorStubComponent>presetsEditor.componentInstance).savePresetEvent.emit('item');
        // A
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const action = store.dispatch.calls.argsFor(0)[0];
        expect(action instanceof themeActions.CreatePreset).toBeTruthy();
        expect(action.payload === 'item').toBeTruthy();
    });
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
