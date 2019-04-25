import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { BlockSchema, BlockValuesModel } from '@shared/models';
import { Subject, combineLatest, Observable, fromEvent, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-page-item-editor',
    templateUrl: './page-item-editor.component.html',
    styleUrls: ['./page-item-editor.component.scss']
})
export class PageItemEditorComponent implements OnInit {

    @Input() model: BlockValuesModel;
    @Input() schema: BlockSchema;
    @Input() blockName: string;

    @Output() backEvent = new EventEmitter<BlockValuesModel>();
    @Output() valueChangedEvent = new EventEmitter<BlockValuesModel>();
    @Output() removeBlockEvent = new EventEmitter<BlockValuesModel>();
    @Output() copyBlockEvent = new EventEmitter<BlockValuesModel>();

    opened = false;
    openedWidthStyle: number;

    private editedModel: BlockValuesModel;

    constructor() { }

    ngOnInit() {
        window.addEventListener('resize', () => this.adjustPanelWidth());
    }

    togglePanel() {
        this.opened = !this.opened;
        this.adjustPanelWidth();
    }

    private adjustPanelWidth() {
        this.openedWidthStyle = this.opened ? window.innerWidth / 2 : null;
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
