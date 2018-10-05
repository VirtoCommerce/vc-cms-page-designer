import { Type, Injectable } from '@angular/core';
import {
    SettingsEditorComponent,
    SimpleTextComponent,
    SimpleImageComponent,
    ImageWithTextComponent,
    ImageCarouselComponent
} from '.';
import { SectionModel, BlockType } from '../models';

@Injectable({
    providedIn: 'root'
})
export class BlocksComponentFactory {
    private components: { [type: string]: Type<any> } = {};

    constructor() {
        this.components[SettingsEditorComponent.Key] = SettingsEditorComponent;
        this.components[SimpleTextComponent.Key] = SimpleTextComponent;
        this.components[SimpleImageComponent.Key] = SimpleImageComponent;
        this.components[ImageWithTextComponent.Key] = ImageWithTextComponent;
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
        if (!!itemEditor) {
            const result = (<any>itemEditor).createPreview();
            return result;
        }
        return null;
    }
}
