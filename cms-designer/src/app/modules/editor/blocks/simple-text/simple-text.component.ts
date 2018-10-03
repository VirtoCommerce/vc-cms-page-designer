import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SectionModel } from '../../models/section.model';
import { BlockType } from '../../models/block-type.model';

@Component({
    selector: 'app-simple-text-editor',
    templateUrl: './simple-text.component.html'
})
export class SimpleTextComponent implements OnInit {
    static Key = 'text';

    @Input() model: any;
    @Input() group: FormGroup;

    constructor() { }

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: SimpleTextComponent.Key,
            name: item.name,
            content: ''
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: SimpleTextComponent.Key,
            name: 'Name of the Block',
            content: 'Some beautyful content'
        };
    }

    ngOnInit() { }

}
