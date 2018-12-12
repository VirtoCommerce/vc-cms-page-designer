import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlockSchema, BlockValuesModel } from 'src/app/modules/shared/models';
import { FormHelper } from '../../services/form.helper';
import { Observable, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit {

    private _model: BlockValuesModel;
    private _schema: BlockSchema;

    @Input() get model(): BlockValuesModel { // модель используется при создании формы, для получения значений
        return this._model;
    }
    set model(value: BlockValuesModel) {
        this._model = value;
        this.createForm();
    }

    @Input() get schema(): BlockSchema { // схема редактируемого блока
        return this._schema;
    }
    set schema(value: BlockSchema) {
        this._schema = value;
        this.createForm();
    }

    @Output() modelChange = new EventEmitter<BlockValuesModel>();

    form: FormGroup;

    constructor(private formHelper: FormHelper) { }

    ngOnInit() { }

    private createForm() {
        if (this.model && this.schema) {
            this.form = this.formHelper.generateForm(this.model, this.schema.settings);
            this.form.valueChanges.subscribe(value => {
                this.modelChange.emit(value);
            });
        }
    }

}
