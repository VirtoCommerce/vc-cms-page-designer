import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PageModel } from '../../models/page.model';
import { SectionModel } from '../../models/section.model';

@Component({
    selector: 'app-page-editor',
    templateUrl: './page-editor.component.html',
    styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

    @Input() model: PageModel;

    @Output() selectEvent = new EventEmitter<SectionModel>();
    @Output() addNewBlockEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    selectItem(item: SectionModel) {
        this.selectEvent.emit(item);
    }

    addNewBlock() {
        // todo: add unique id to new block
        this.addNewBlockEvent.emit();
    }

    selectSettings() {
        this.selectEvent.emit(this.model.settings);
    }
}
