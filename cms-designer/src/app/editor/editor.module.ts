import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxWeditorModule } from 'ngx-weditor';

import { SharedModule } from '../shared/shared.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ThemeEditorComponent } from './theme-editor/theme-editor.component';
import { PageEditorComponent } from './page-editor/page-editor.component';
import { SelectTypeComponent } from './page-editor/select-type.component';

import { ThemeItemEditorComponent } from './theme-editor/theme-item-editor.component';
import { PresetsEditorComponent } from './presets-editor/presets-editor.component';
import { SelectItemComponent } from './controls/select-item/select-item.component';
import { CheckboxItemComponent } from './controls/checkbox-item/checkbox-item.component';
import { ImageItemComponent } from './controls/image-item/image-item.component';
import { TextItemComponent } from './controls/text-item/text-item.component';
import { ColorItemComponent } from './controls/color-item/color-item.component';
import { SectionIconDirective } from './controls/icons.directive';

import { reducer } from './state/editor.reducer';
import { EditorEffects } from './state/editor.effects';
import { PageItemEditorComponent } from './page-editor/page-item-editor.component';
import { SettingsEditorComponent } from './block-editors/settings-editor/settings-editor.component';
import { BlockHostDirective } from './block-editors/block-host.directive';
import { SimpleTextComponent } from './block-editors/simple-text/simple-text.component';
import { StringEditorComponent } from './block-editors/controls/string-editor/string-editor.component';
import { TextEditorComponent } from './block-editors/controls/text-editor/text-editor.component';

const EDITOR_COMPONENTS = [SettingsEditorComponent, SimpleTextComponent];

@NgModule({
    declarations: [
        SidebarComponent,
        ThemeEditorComponent,
        PageEditorComponent,
        ThemeItemEditorComponent,
        PresetsEditorComponent,
        SelectItemComponent,
        CheckboxItemComponent,
        ImageItemComponent,
        TextItemComponent,
        ColorItemComponent,
        SelectTypeComponent,
        SectionIconDirective,
        PageItemEditorComponent,
        BlockHostDirective,
        ...EDITOR_COMPONENTS,
        StringEditorComponent,
        TextEditorComponent
    ],
    entryComponents: [...EDITOR_COMPONENTS],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        NgxWeditorModule,
        StoreModule.forFeature('editor', reducer),
        EffectsModule.forFeature([EditorEffects])
    ],
    exports: [
        SidebarComponent
    ]
})
export class EditorModule { }
