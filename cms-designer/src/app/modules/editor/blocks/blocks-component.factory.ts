import { Type, Injectable } from '@angular/core';
import {
    SettingsEditorComponent,
    SimpleTextComponent,
    SimpleImageComponent,
    ImageWithTextComponent,
    ImageCarouselComponent,
    ImageWithTextOverlayComponent
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

        // { type: 'textcolumns-with-images',  name: 'Text columns with images',   inactive: true },
        // { type: 'images-layout',            name: 'Images layout',              inactive: true }

    }

    getComponentsDescriptors(): BlockType[] {
        const keys = Object.keys(this.components);
        return keys.map(key => <BlockType>{
            name: this.components[key].name,
            type: key
        });
    }

    resolve(type: string): Type<any> {
        const result = this.components[type];
        return result.type;
    }

    create(item: BlockType): SectionModel {
        const itemEditorType = this.components[item.type].type;
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
