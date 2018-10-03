import { Type, Injectable } from '@angular/core';
import { SettingsEditorComponent } from './settings-editor/settings-editor.component';
import { SimpleTextComponent } from './simple-text/simple-text.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { SectionModel } from '../models/section.model';
import { BlockType } from '../models/block-type.model';

@Injectable({
    providedIn: 'root'
})
export class BlocksComponentFactory {
    private components: {[type: string]: Type<any>} = {};

    constructor() {
        this.components[SettingsEditorComponent.Key] = SettingsEditorComponent;
        this.components[SimpleTextComponent.Key] = SimpleTextComponent;
        this.components[ImageCarouselComponent.Key] = ImageCarouselComponent;
    }

    resolve(type: string): Type<any> {
        const result = this.components[type];
        return result;
    }

    create(item: BlockType): SectionModel {
        const itemEditor = this.components[item.type];
        const result = (<any>itemEditor).createModel(item);
        return result;
    }

    createPreview(type: string): SectionModel {
        const itemEditor = this.components[type];
        const result = (<any>itemEditor).createPreview();
        return result;
    }
}
