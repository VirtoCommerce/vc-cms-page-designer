import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BlockSchema, BlocksSchema } from 'src/app/modules/shared/models';

@Component({
    selector: 'app-select-type',
    templateUrl: './select-type.component.html',
    styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {

    @Input() schema: BlocksSchema;
    @Output() backEvent = new EventEmitter<any>();
    @Output() previewBlockEvent = new EventEmitter<BlockSchema>();
    @Output() selectBlockEvent = new EventEmitter<BlockSchema>();

    selectedItem: string;

    constructor() { }

    ngOnInit() {
    }

    back() {
        this.backEvent.emit();
    }

    previewItem(item: BlockSchema) {
        this.selectedItem = item.type;
        this.previewBlockEvent.emit(item);
    }

    selectItem(item: BlockSchema) {
        this.selectBlockEvent.emit(item);
    }
}
