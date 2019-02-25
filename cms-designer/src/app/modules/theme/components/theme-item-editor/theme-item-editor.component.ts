import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { BlockSchema, ValueType } from '@shared/models';

@Component({
    selector: 'app-theme-item-editor',
    templateUrl: './theme-item-editor.component.html',
    styleUrls: ['./theme-item-editor.component.scss']
})
export class ThemeItemEditorComponent implements OnInit, AfterViewInit {

    @Input() schema: BlockSchema;
    @Input() theme: { [key: string]: ValueType };
    @Output() valueChangedEvent = new EventEmitter<any>();

    constructor() { }

    ngAfterViewInit(): void { }

    ngOnInit() { }

    themeChanged(model) {
        this.valueChangedEvent.emit(model);
    }
}
