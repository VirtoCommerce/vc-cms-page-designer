import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SectionModel } from '../../models/section.model';
import { BlockType } from '../../models/block-type.model';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html'
})
export class ImageCarouselComponent {
    static Key = 'image-carousel';

    @Input() model: any;
    @Input() group: FormGroup;

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: ImageCarouselComponent.Key,
            name: item.name,
            images: [],
            autoRotate: true,
            rotationFrequency: '7000',
            contentSize: 'medium',
            blockWidth: 'screen'
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: ImageCarouselComponent.Key,
            name: 'Block',
            images: [],
            autoRotate: true,
            rotationFrequency: '7000',
            contentSize: 'medium',
            blockWidth: 'screen',
        };
    }
}
