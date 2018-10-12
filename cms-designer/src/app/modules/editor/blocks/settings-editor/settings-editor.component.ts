import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SectionModel, BlockType } from '../../models';

@Component({
    selector: 'app-settings-editor',
    templateUrl: './settings-editor.component.html',
    styleUrls: ['./settings-editor.component.scss']
})
export class SettingsEditorComponent implements OnInit {

    static Key = 'settings';

    @Input() model: any;
    @Input() group: FormGroup;

    constructor() { }

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: SettingsEditorComponent.Key,
            name: item.name,
            title: '',
            permalink: ''
        };
    }

    ngOnInit() { }
}
