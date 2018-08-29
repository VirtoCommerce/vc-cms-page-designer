import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-select-type',
    templateUrl: './select-type.component.html',
    styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {

    @Input() types: any;
    @Output() backEvent = new EventEmitter<any>();
    @Output() previewBlockEvent = new EventEmitter<string>();
    @Output() selectBlockEvent = new EventEmitter<string>();

    selectedItem: string;

    constructor() { }

    ngOnInit() {
    }

    back() {
        this.backEvent.emit();
    }

    previewItem(type: string) {
        this.selectedItem = type;
        this.previewBlockEvent.emit(type);
    }

    selectItem(item: any) {
        if (!item.inactive) {
            this.selectBlockEvent.emit(item.type);
        }
    }
}
