import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-page-editor',
    templateUrl: './page-editor.component.html',
    styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

    @Output() loadedEvent = new EventEmitter<boolean>();
    @Output() selectEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.loadedEvent.emit(true);
    }

}
