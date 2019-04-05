import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BlockSchema, BlockValuesModel } from '@shared/models';
import { FormHelper } from '@shared/services';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit, OnDestroy {

    private _model: BlockValuesModel;
    private _schema: BlockSchema;


    @Input() get model(): BlockValuesModel { // модель используется при создании формы, для получения значений
        return this._model;
    }
    set model(value: BlockValuesModel) {
        if (this._model !== value) {
            this._model = value;
            this.createForm();
        }
    }

    @Input() get schema(): BlockSchema { // схема редактируемого блока
        return this._schema;
    }
    set schema(value: BlockSchema) {
        if (this._schema !== value) {
            this._schema = value;
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
        if (this.model && this.schema && this.model.type === this.schema.type) {
            this.form = this.formHelper.generateForm(this.model, this.schema.settings);
            this.subscription = this.form.valueChanges.subscribe(value => {
                console.log(this.form);
                this.modelChange.emit(value);
            });
            // this.changeDetector.markForCheck();
            // this.changeDetector.detectChanges();
        }
    }

}
