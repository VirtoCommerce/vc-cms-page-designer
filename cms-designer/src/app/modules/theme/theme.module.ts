import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import {
    ThemeEditorComponent,
    ThemeItemEditorComponent,
    PresetsEditorComponent
} from './components';

import { reducer } from './store/theme.reducer';
import { ThemeEffects } from './store/theme.effects';

const COMPONENTS = [
    ThemeEditorComponent,
    ThemeItemEditorComponent,
    PresetsEditorComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('theme', reducer),
        EffectsModule.forFeature([ThemeEffects])
    ],
    exports: COMPONENTS
})
export class ThemeModule { }
