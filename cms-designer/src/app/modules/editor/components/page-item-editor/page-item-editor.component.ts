import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { BlockSchema, BlockValuesModel } from 'src/app/modules/shared/models';

@Component({
    selector: 'app-page-item-editor',
    templateUrl: './page-item-editor.component.html',
    styleUrls: ['./page-item-editor.component.scss']
})
export class PageItemEditorComponent implements OnInit {

    @Input() model: BlockValuesModel;
    @Input() schema: BlockSchema;

    @Output() backEvent = new EventEmitter<BlockValuesModel>();
    @Output() valueChangedEvent = new EventEmitter<BlockValuesModel>();
    @Output() removeBlockEvent = new EventEmitter<BlockValuesModel>();
    @Output() copyBlockEvent = new EventEmitter<BlockValuesModel>();

    private editedModel: BlockValuesModel;

    constructor() { }

    ngOnInit() { }

    back() {
        // this value will be applyed onto current section in the editor.reducer
        // therefore i should not apply the uneditable properties
        this.backEvent.emit(this.editedModel);
    }

    modelChanged(model) {
        this.editedModel = (!this.schema.static) ? model : {
            ...model,
            type: 'settings'
        };
        this.valueChangedEvent.emit(this.editedModel);
    }

    removeBlock() {
        this.removeBlockEvent.emit(this.model);
    }

    copyBlock() {
        this.copyBlockEvent.emit(this.model);
    }
}
