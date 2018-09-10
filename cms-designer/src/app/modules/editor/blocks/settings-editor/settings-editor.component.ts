import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    ngOnInit() { }

}
