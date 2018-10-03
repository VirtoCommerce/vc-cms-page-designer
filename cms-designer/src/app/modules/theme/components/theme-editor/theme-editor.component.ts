import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

    @Input() schema;

    @Output() selectItemEvent = new EventEmitter<any>();
    @Output() selectPresetEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    selectPresets() {
        this.selectPresetEvent.emit();
    }

    selectItem(item: any) {
        this.selectItemEvent.emit(item);
    }
}
