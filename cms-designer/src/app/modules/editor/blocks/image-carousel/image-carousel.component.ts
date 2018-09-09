import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html'
})
export class ImageCarouselComponent {
    static Key = 'image-carousel';

    @Input() model: any;
    @Input() group: FormGroup;
}
