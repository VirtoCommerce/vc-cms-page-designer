import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import {
    PageEditorComponent,
    PageItemEditorComponent,
    SelectTypeComponent
} from './components';
import { CreatableBlocksPipe } from '@editor/services';

import { reducer } from './store/editor.reducer';
import { EditorEffects } from './store/editor.effects';

const COMPONENTS = [
    PageEditorComponent,
    PageItemEditorComponent,
    SelectTypeComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        CreatableBlocksPipe
    ],
    exports: COMPONENTS,
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        DragDropModule,
        StoreModule.forFeature('editor', reducer),
        EffectsModule.forFeature([EditorEffects])
    ]
})
export class EditorModule { }
