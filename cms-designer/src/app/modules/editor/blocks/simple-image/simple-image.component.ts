import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SectionModel } from '../../models/section.model';
import { BlockType } from '../../models/block-type.model';

@Component({
    selector: 'app-simple-image-editor',
    templateUrl: './simple-image.component.html'
})
export class SimpleImageComponent implements OnInit {
    static Key = 'image';

    @Input() model: any;
    @Input() group: FormGroup;

    options = [
        {
            label: 'Small',
            value: 'small'
        },
        {
            label: 'Medium',
            value: 'medium'
        },
        {
            label: 'Large',
            value: 'large'
        },
        {
            label: 'Extra Large',
            value: 'xlarge'
        }
    ];

    constructor() { }

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: SimpleImageComponent.Key,
            name: item.name,
            url: 'http://dev-cms-vm.westeurope.cloudapp.azure.com/admin/Assets/blogs/7047371_original.jpg',
            imageSize: 'medium'
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: SimpleImageComponent.Key,
            name: 'Name of the Block',
            url: 'http://dev-cms-vm.westeurope.cloudapp.azure.com/admin/Assets/blogs/7047371_original.jpg',
            imageSize: 'medium'
        };
    }

    ngOnInit() { }

}
