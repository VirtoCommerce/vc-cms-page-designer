import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

    @Input() value: string;
    @Output() valueChanged = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    raiseValueChanged($event) {
        this.valueChanged.emit($event);
    }
}
