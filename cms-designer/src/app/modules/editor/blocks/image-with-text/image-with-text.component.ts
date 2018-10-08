import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlockType, SectionModel } from '../../models';

@Component({
    selector: 'app-image-with-text',
    templateUrl: './image-with-text.component.html'
})
export class ImageWithTextComponent implements OnInit {
    static Key = 'image-with-text';

    @Input() model: any;
    @Input() group: FormGroup;

    sizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra Large', value: 'xlarge' }
    ];

    alignOptions = [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' }
    ];

    constructor() { }

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: ImageWithTextComponent.Key,
            name: item.name,
            align: 'left',
            content: '',
            url: 'http://download.seaicons.com/icons/sora-meliae/matrilineare/1024/Places-folder-pictures-icon.png',
            imageSize: 'medium'
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: ImageWithTextComponent.Key,
            name: 'Name of the Block',
            align: 'left',
            content: 'This is a paragraph where you can describe your chosen product, collection, or ' +
                     'blog posts. Add some text to make this block attractive to your customers',
            url: 'http://download.seaicons.com/icons/sora-meliae/matrilineare/1024/Places-folder-pictures-icon.png',
            imageSize: 'medium'
        };
    }

    ngOnInit() { }
}
