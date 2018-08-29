import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-presets-editor',
    templateUrl: './presets-editor.component.html',
    styleUrls: ['./presets-editor.component.scss']
})
export class PresetsEditorComponent implements OnInit {

    @Input() data: any;
    @Input() theme: any;
    @Output() backEvent = new EventEmitter<any>();

    savingPreset = false;
    newPresetName = 'Preset name';

    constructor() { }

    ngOnInit() { }

    openPreset(name: string) { }

    removePreset(name: string) { }

    back() {
        this.backEvent.emit(null);
    }
}
