import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PageModel } from '../../models/page.model';
import { SectionModel } from '../../models/section.model';
import { SortEvent } from '../../../shared/draggable';

@Component({
    selector: 'app-page-editor',
    templateUrl: './page-editor.component.html',
    styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

    @Input() model: PageModel;

    @Output() selectEvent = new EventEmitter<SectionModel>();
    @Output() addNewBlockEvent = new EventEmitter<any>();
    @Output() orderChangedEvent = new EventEmitter<SortEvent>();

    constructor() { }

    ngOnInit() { }

    selectItem(item: SectionModel) {
        this.selectEvent.emit(item);
    }

    addNewBlock() {
        this.addNewBlockEvent.emit();
    }

    selectSettings() {
        this.selectEvent.emit(this.model.settings);
    }

    sortItems(event: SortEvent) {
        // todo: подумать, может стоит отправлять событие не в конце d-n-d, а синхронно?
        if (event.complete) {
            this.orderChangedEvent.emit(event);
        } else {
            const current = this.model.sections[event.currentIndex];
            const swapWith = this.model.sections[event.newIndex];

            this.model.sections[event.newIndex] = current;
            this.model.sections[event.currentIndex] = swapWith;
        }
    }
}
