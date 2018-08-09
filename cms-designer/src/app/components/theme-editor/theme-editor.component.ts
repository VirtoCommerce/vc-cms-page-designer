import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

    @Input() settings;
    @Input() presets;

    @Output() selectEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {

    }

    selectPresets() {
        this.selectEvent.emit(this.presets);
    }

    selectItem(item: any) {
        this.selectEvent.emit(item);
    }
}
