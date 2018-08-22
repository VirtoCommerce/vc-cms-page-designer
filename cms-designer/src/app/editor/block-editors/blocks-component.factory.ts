import { Type, Injectable } from '@angular/core';
import { SettingsEditorComponent } from './settings-editor/settings-editor.component';
import { SimpleTextComponent } from './simple-text/simple-text.component';

@Injectable({
    providedIn: 'root'
})
export class BlocksComponentFactory {
    private components: {[type: string]: Type<any>} = {};

    constructor() {
        this.components[SettingsEditorComponent.Key] = SettingsEditorComponent;
        this.components[SimpleTextComponent.Key] = SimpleTextComponent;
    }

    resolve(type: string): Type<any> {
        const result = this.components[type];
        return result;
    }
}
