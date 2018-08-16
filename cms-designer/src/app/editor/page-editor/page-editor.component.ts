import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PageModel } from '../models/page.model';

@Component({
    selector: 'app-page-editor',
    templateUrl: './page-editor.component.html',
    styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

    @Input() model = new PageModel();

    @Output() loadedEvent = new EventEmitter<boolean>();
    @Output() selectEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.loadedEvent.emit(true);
    }

}
