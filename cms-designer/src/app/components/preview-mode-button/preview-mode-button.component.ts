import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-preview-mode-button',
    templateUrl: './preview-mode-button.component.html',
    styleUrls: ['./preview-mode-button.component.scss']
})
export class PreviewModeButtonComponent implements OnInit {

    @Input() type: string;
    @Input() title: string;
    @Input() selected: boolean;
    @Output() change = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    onButtonClick() {
        this.change.emit(this.type);
    }

}
