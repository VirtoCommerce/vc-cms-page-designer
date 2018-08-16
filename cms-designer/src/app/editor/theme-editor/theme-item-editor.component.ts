import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { ThemeItemModel } from '../models/themes/theme-item.model';

@Component({
    selector: 'app-theme-item-editor',
    templateUrl: './theme-item-editor.component.html',
    styleUrls: ['./theme-item-editor.component.scss']
})
export class ThemeItemEditorComponent implements OnInit, AfterViewInit {

    @Input() item: ThemeItemModel;
    @Input() theme: any;
    @Output() backEvent = new EventEmitter<any>();

    constructor() { }

    ngAfterViewInit(): void { }

    ngOnInit() {
    }

    back() {
        this.backEvent.emit(null);
    }

}
