import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BlockSchema, BlockValuesModel } from '@shared/models';
import { FormHelper } from '@shared/services';
import { ReturnStatement } from '@angular/compiler';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit, OnDestroy {
    private _model: BlockValuesModel;
    private _schema: BlockSchema;

    @Input() context: any;

    @Input() get model(): BlockValuesModel { // модель используется при создании формы, для получения значений
        return this._model;
    }
    set model(value: BlockValuesModel) {
        if (this._model !== value) {
            this._model = value;
            console.log('model');
            this.createForm();
        }
    }

    @Input() get schema(): BlockSchema { // схема редактируемого блока
        return this._schema;
    }
    set schema(value: BlockSchema) {
        if (this._schema !== value) {
            this._schema = value;
            console.log('schema');
            this.createForm();
        }
    }

    @Output() modelChange = new EventEmitter<BlockValuesModel>();

    form: FormGroup;

    private subscription: Subscription = null;

    constructor(private formHelper: FormHelper, private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    private createForm() {
        const m = this.model;
        const s = this.schema;
        if (m && s && m.type === s.type) {
            console.log('create form');
            if (this.subscription != null) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
            this.form = this.formHelper.generateForm(m, s.settings);
            this.subscription = this.form.valueChanges.subscribe(value => {
                console.log('form');
                this.modelChange.emit(value);
            });
            // this.changeDetector.markForCheck();
            this.changeDetector.detectChanges();
        }
    }
}
