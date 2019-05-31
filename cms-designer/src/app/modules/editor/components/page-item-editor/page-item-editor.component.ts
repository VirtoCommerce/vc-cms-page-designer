import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { BlockSchema, BlockValuesModel, BlocksSchema } from '@shared/models';
import { Subject, combineLatest, Observable, fromEvent, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { WindowRef } from '@app/services';

@Component({
    selector: 'app-page-item-editor',
    templateUrl: './page-item-editor.component.html',
    styleUrls: ['./page-item-editor.component.scss']
})
export class PageItemEditorComponent implements OnInit {

    private _mode: string;
    private _model: BlockValuesModel;
    private _schema: BlocksSchema;

    @Input() get model(): BlockValuesModel {
        return this._model;
    }

    set model(value: BlockValuesModel) {
        this._model = value;
        this.updateTabs();
    }

    @Input() get schema(): BlocksSchema {
        return this._schema;
    }
    set schema(value: BlocksSchema) {
        this._schema = value;
        this.updateTabs();
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

    constructor(private windowRef: WindowRef) { }

    ngOnInit() {
        this.windowRef.nativeWindow.addEventListener('resize', () => this.adjustPanelWidth());
    }

    togglePanel() {
        this.changeEditorModeEvent.emit(this.mode === 'wide' ? 'normal' : 'wide');
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

    private updateTabs() {
        if (this.model && this.schema) {
            this.tabs = this.schema[this.model.type].settings.reduce(
                (result, list) => result.indexOf(list.tab || 'General') === -1
                    ? result.concat(list.tab || 'General')
                    : result,
                []
            ).sort();
            this.activeTab = this.tabs[0];
        }
    }

    private adjustPanelWidth() {
        this.openedWidthStyle = this.mode === 'wide' ? this.windowRef.nativeWindow.innerWidth / 2 : null;
    }
}
