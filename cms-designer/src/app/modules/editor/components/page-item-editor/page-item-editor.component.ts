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

    private _mode: string;
    private _schema: BlockSchema;

    @Input() model: BlockValuesModel;
    @Input() get schema(): BlockSchema {
        return this._schema;
    }
    set schema(value: BlockSchema) {
        this._schema = value;
        this.tabs = this.schema.settings.reduce(
            (result, list) => result.indexOf(list.tab || 'General') === -1
                ? result.concat(list.tab || 'General')
                : result,
            []
        ).sort();
        this.activeTab = this.tabs[0];
    }

    @Input() blockName: string;
    @Input() get mode(): string {
        return this._mode;
    }
    set mode(value: string) {
        this._mode = value;
        this.adjustPanelWidth();
    }

    @Output() backEvent = new EventEmitter<BlockValuesModel>();
    @Output() valueChangedEvent = new EventEmitter<BlockValuesModel>();
    @Output() removeBlockEvent = new EventEmitter<BlockValuesModel>();
    @Output() copyBlockEvent = new EventEmitter<BlockValuesModel>();
    @Output() changeEditorModeEvent = new EventEmitter<string>();

    tabs: string[];
    openedWidthStyle: number;
    activeTab: string;

    private editedModel: BlockValuesModel;

    constructor() { }

    ngOnInit() {
        window.addEventListener('resize', () => this.adjustPanelWidth());
    }

    togglePanel() {
        this.changeEditorModeEvent.emit(this.mode === 'wide' ? 'normal' : 'wide');
    }

    private adjustPanelWidth() {
        this.openedWidthStyle = this.mode === 'wide' ? window.innerWidth / 2 : null;
    }

    setActiveTab(tabName: string) {
        this.activeTab = tabName;
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
