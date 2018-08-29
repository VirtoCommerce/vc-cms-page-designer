import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html'
})
export class ImageCarouselComponent {
    static Key = 'image-carousel';

    @Input() model: any;
}
