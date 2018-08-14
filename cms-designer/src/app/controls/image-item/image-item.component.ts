import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {

    @ViewChild('fileInput', {read: ElementRef}) fileInput: ElementRef;

    @Input() model;
    @Input() theme;

    constructor() { }

    ngOnInit() {
    }

    openFileDialog() {
        this.fileInput.nativeElement.click();
    }

    raiseValueChanged($event) {
        this.theme[this.model.id] = $event;
    }
}
