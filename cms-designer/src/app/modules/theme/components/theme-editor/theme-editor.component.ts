import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BlockSchema } from '@shared/models';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

    @Input() schema: BlockSchema[];
    @Input() noSchema: boolean;
    @Input() noPresets: boolean;

    @Output() selectItemEvent = new EventEmitter<any>();
    @Output() selectPresetEvent = new EventEmitter<any>();
    @Output() reloadData = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    selectPresets() {
        this.selectPresetEvent.emit();
    }

    selectItem(item: any) {
        this.selectItemEvent.emit(item);
    }

    onReloadData() {
        this.reloadData.emit();
    }
}
