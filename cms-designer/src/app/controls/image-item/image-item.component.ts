import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {

    @Input() value: string;
    @Output() valueChanged = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    raiseValueChanged($event) {
        this.valueChanged.emit($event);
    }
}
