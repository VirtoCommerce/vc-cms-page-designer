import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BlockValuesModel, BlocksSchema } from 'src/app/modules/shared/models';
import { PageModel } from '../../models/page.model';
import { SortEvent } from '../../../shared/draggable';

@Component({
    selector: 'app-page-editor',
    templateUrl: './page-editor.component.html',
    styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

    @Input() model: PageModel;
    @Input() schema: BlocksSchema;

    @Output() selectEvent = new EventEmitter<BlockValuesModel>();
    @Output() addNewBlockEvent = new EventEmitter<any>();
    @Output() orderChangedEvent = new EventEmitter<SortEvent>();

    constructor() { }

    ngOnInit() { }

    selectItem(item: BlockValuesModel) {
        this.selectEvent.emit(item);
    }

    addNewBlock() {
        this.addNewBlockEvent.emit();
    }

    sortItems(event: SortEvent) {
        // todo: подумать, может стоит отправлять событие не в конце d-n-d, а синхронно?
        if (event.complete) {
            this.orderChangedEvent.emit(event);
        } else {
            const current = this.model[event.currentIndex];
            const swapWith = this.model[event.newIndex];

            this.model[event.newIndex] = current;
            this.model[event.currentIndex] = swapWith;
        }
    }
    getBlockName(item): string {
        const schemaItem = this.schema[item.type];
        let result: string = null;
        if (!!schemaItem) {
            const displayProperty = schemaItem.displayField;
            if (!!displayProperty) {
                result = this.model[displayProperty];
            }
        }
        const unknownBlock = <any>item;
        return result || unknownBlock.name || unknownBlock.title || '<unnamed block>';
    }
}
