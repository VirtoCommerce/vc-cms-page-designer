import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BlockValuesModel, BlocksSchema, BlockSchema } from 'src/app/modules/shared/models';
import { PageModel } from '../../models/page.model';
import { SortEvent } from '../../../shared/components';

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
            const current = this.model.content[event.currentIndex];
            const swapWith = this.model.content[event.newIndex];

            this.model.content[event.newIndex] = current;
            this.model.content[event.currentIndex] = swapWith;
        }
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
