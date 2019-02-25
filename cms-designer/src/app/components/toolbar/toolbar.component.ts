import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input() buttons = [];
    @Input() activeButton: string;

    @Output() buttonClick = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    onButtonClick(name: string) {
        this.buttonClick.emit(name);
    }
}
