import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

import * as fromRoot from '../../state';
import * as rootActions from '../../state/root.actions';
import * as fromEditor from '../../modules/editor/state';
import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromTheme from '../../modules/theme/state';
import * as themeActions from '../../modules/theme/state/theme.actions';

describe('SidebarComponent', () => {
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            providers: []
        });

        fixture = TestBed.createComponent(SidebarComponent);
    });

    xit('selectSchemaItem');
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
