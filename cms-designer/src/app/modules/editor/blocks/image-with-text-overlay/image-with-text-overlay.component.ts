import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlockType, SectionModel } from '../../models';

@Component({
    selector: 'app-image-with-text-overlay',
    templateUrl: './image-with-text-overlay.component.html'
})
export class ImageWithTextOverlayComponent {
    static Key = 'image-with-text-overlay';

    @Input() model: any;
    @Input() group: FormGroup;

    alignOptions = [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
    ];

    blockWidthOptions = [
        { label: 'Screen', value: 'screen' },
        { label: 'Container', value: 'container' },
        { label: 'Small', value: 'small' }
    ];

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: ImageWithTextOverlayComponent.Key,
            name: item.name,
            align: 'center',
            blockWidth: 'screen',
            content: 'This is a subtitle where you can describe what this page is about.' +
                     'Add some text to make this block attractive to your customers',
            // sectionHeight: 'medium',
            textBackground: false,
            textBackgroundColor: 'black',
            textBackgroundOpacity: 0.5,
            title: 'Image with text overlay',
            url: 'https://cdn2.slidemodel.com/wp-content/uploads/7243-01-low-poly-background-16x9-1.jpg'
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: ImageWithTextOverlayComponent.Key,
            name: 'Image with text overlay',
            align: 'center',
            blockWidth: 'screen',
            content: 'This is a subtitle where you can describe what this page is about.' +
                     'Add some text to make this block attractive to your customers',
            // sectionHeight: 'medium',
            textBackground: false,
            textBackgroundColor: 'black',
            textBackgroundOpacity: 0.5,
            title: 'Image with text overlay',
            url: 'https://cdn2.slidemodel.com/wp-content/uploads/7243-01-low-poly-background-16x9-1.jpg'
        };
    }
}
