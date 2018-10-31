import { Type, Injectable } from '@angular/core';
import {
    SettingsEditorComponent,
    SimpleTextComponent,
    SimpleImageComponent,
    ImageWithTextComponent,
    ImageCarouselComponent,
    ImageWithTextOverlayComponent,
    TextColumnsWithImagesComponent,
    ImageLayoutComponent
} from '.';
import { SectionModel, BlockType } from '../models';

@Injectable({
    providedIn: 'root'
})
export class BlocksComponentFactory {
    private components: { [type: string]: { name: string; type: Type<any> } } = {};

    constructor() {
        this.components[SettingsEditorComponent.Key] = { name: 'Settings', type: SettingsEditorComponent };
        this.components[SimpleTextComponent.Key] = { name: 'Simple text', type: SimpleTextComponent };
        this.components[SimpleImageComponent.Key] = { name: 'Simple image', type: SimpleImageComponent };
        this.components[ImageWithTextComponent.Key] = { name: 'Image with text', type: ImageWithTextComponent };
        this.components[ImageWithTextOverlayComponent.Key] = { name: 'Image with text overlay', type: ImageWithTextOverlayComponent };
        this.components[ImageCarouselComponent.Key] = { name: 'Image carousel', type: ImageCarouselComponent };
        this.components[TextColumnsWithImagesComponent.Key] = { name: 'Text columns with images', type: TextColumnsWithImagesComponent };
        this.components[ImageLayoutComponent.Key] = { name: 'Image layout', type: ImageLayoutComponent };
    }

    getComponentsDescriptors(): BlockType[] {
        const keys = Object.keys(this.components);
        return keys.filter(x => this.components[x].name !== 'Settings').map(key => <BlockType>{
            name: this.components[key].name,
            type: key
        });
    }

    resolve(type: string): Type<any> {
        const result = this.components[type];
        return result.type;
    }

    create(item: string | BlockType): SectionModel {
        const itemEditorType = this.components[(typeof item === 'string') ? item : item.type].type;
        const result = (<any>itemEditorType).createModel(item);
        return result;
    }

    createPreview(type: string): SectionModel {
        const itemEditorType = this.components[type].type;
        if (!!itemEditorType) {
            const result = (<any>itemEditorType).createPreview();
            return result;
        }
        return null;
    }
}
