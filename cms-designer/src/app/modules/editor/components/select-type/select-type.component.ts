import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BlockType } from '../../models/block-type.model';

@Component({
    selector: 'app-select-type',
    templateUrl: './select-type.component.html',
    styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {

    @Input() types: BlockType[];
    @Output() backEvent = new EventEmitter<any>();
    @Output() previewBlockEvent = new EventEmitter<BlockType>();
    @Output() selectBlockEvent = new EventEmitter<BlockType>();

    selectedItem: string;

    constructor() { }

    ngOnInit() {
    }

    back() {
        this.backEvent.emit();
    }

    previewItem(item: BlockType) {
        this.selectedItem = item.type;
        this.previewBlockEvent.emit(item);
    }

    selectItem(item: BlockType) {
        this.selectBlockEvent.emit(item);
    }
}
