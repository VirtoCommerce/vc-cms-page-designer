import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';

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

    icon(type: string): string {
        switch (type) {
            case 'text': return 'font';
            case 'image-carousel': return 'images';
            case 'textcolumns-with-images': return 'columns';
        }
        return type;
    }

    selectItem(item: SectionModel) {
        this.selectEvent.emit(item);
    }

    addNewBlock() {
        this.addNewBlockEvent.emit();
    }

    selectSettings() {
        this.selectEvent.emit(this.model.settings);
    }
}
