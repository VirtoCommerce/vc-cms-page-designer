import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-presets-editor',
    templateUrl: './presets-editor.component.html',
    styleUrls: ['./presets-editor.component.scss']
})
export class PresetsEditorComponent implements OnInit {

    @Input() data: any;
    @Input() theme: any;
    @Output() backEvent = new EventEmitter<any>();
    @Output() removePresetEvent = new EventEmitter<string>();
    @Output() savePresetEvent = new EventEmitter<string>();
    @Output() selectPresetEvent = new EventEmitter<string>();

    form: FormGroup;
    savingPreset = false;
    newPresetName = 'Preset name';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', Validators.required]
        });
    }

    selectPreset(name: string) {
        this.selectPresetEvent.emit(name);
    }

    savePreset() {
        this.savePresetEvent.emit(this.form.get('name').value);
        this.savingPreset = false;
    }

    removePreset(name: string) {
        this.removePresetEvent.emit(name);
    }

    back() {
        this.backEvent.emit(null);
    }
}
