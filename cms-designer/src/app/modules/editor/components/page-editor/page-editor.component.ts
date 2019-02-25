import { Component, OnInit, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { BlockValuesModel, BlocksSchema } from 'src/app/modules/shared/models';
import { PageModel } from '@editor/models';
import { CdkDragSortEvent } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-page-editor',
    templateUrl: './page-editor.component.html',
    styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

    private _model: PageModel;
    private _schema: BlocksSchema;

    topItems: BlockValuesModel[];
    bottomItems: BlockValuesModel[];

    @Input() set model(value: PageModel) {
        this._model = value;
        this.updateLItems();
    }
    get model(): PageModel {
        return this._model;
    }

    @Input() set schema(value: BlocksSchema) {
        this._schema = value;
        this.updateLItems();
    }
    get schema(): BlocksSchema {
        return this._schema;
    }

    @Input() noSchema: boolean;
    @Input() noPage: boolean;

    @Output() selectEvent = new EventEmitter<BlockValuesModel>();
    @Output() addNewBlockEvent = new EventEmitter<any>();
    @Output() orderChangedEvent = new EventEmitter<CdkDragSortEvent<BlockValuesModel>>();
    @Output() visibilityChanged = new EventEmitter<BlockValuesModel>();
    @Output() reloadData = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    selectItem(item: BlockValuesModel) {
        this.selectEvent.emit(item);
    }

    addNewBlock() {
        this.addNewBlockEvent.emit();
    }

    getBlockIcon(item): string {
        return this.schema[item.type].icon;
    }

    getBlockName(item): string {
        const schemaItem = this.schema[item.type];
        let result: string = null;
        if (!!schemaItem) {
            if (!!schemaItem.static) {
                result = schemaItem.name;
            } else {
                const displayProperty = schemaItem.displayField;
                if (!!displayProperty) {
                    result = this.model[displayProperty];
                }
            }
        }
        const unknownBlock = <any>item;
        return result || unknownBlock.name || unknownBlock.title || unknownBlock.type || '<unnamed block>';
    }

    onReloadData() {
        this.reloadData.emit();
    }

    toggleItemVisibility(event: MouseEvent, item: BlockValuesModel) {
        event.stopPropagation();
        event.preventDefault();
        this.visibilityChanged.emit(item);
    }

    reorder(event: CdkDragSortEvent<BlockValuesModel>) {
        const element = this.model.content.splice(event.previousIndex, 1);
        this.model.content.splice(event.currentIndex, 0, ...element);
        this.orderChangedEvent.emit(event);
    }

    private updateLItems() {
        if (!!this._model && !!this._schema) {
            this.topItems = this.getItemsByStaticKey('top');
            this.bottomItems = this.getItemsByStaticKey('bottom');
        }
    }

    private getItemsByStaticKey(staticKey: string): BlockValuesModel[] {
        const result = Object.keys(this._schema).filter(key => this._schema[key].static === staticKey).map(key => <BlockValuesModel>{
            ...this._model.settings,
            type: key
        });
        return result;
    }
}
