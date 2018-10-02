import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SectionModel } from '../../models/section.model';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html'
})
export class ImageCarouselComponent {
    static Key = 'image-carousel';

    @Input() model: any;
    @Input() group: FormGroup;

    static createModel(): SectionModel {
        return <SectionModel>{
            type: ImageCarouselComponent.Key,
            name: 'New image carousel',
            images: [],
            autoRotate: true,
            rotationFrequency: '7000',
            contentSize: 'medium',
            blockWidth: 'screen',
            ispreview: false
        };
    }
}
