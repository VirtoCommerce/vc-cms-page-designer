import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlocksSchema, BlockValuesModel } from 'src/app/modules/shared/models';

@Component({
    selector: 'app-page-item-editor',
    templateUrl: './page-item-editor.component.html',
    styleUrls: ['./page-item-editor.component.scss']
})
export class PageItemEditorComponent implements OnInit {

    schemaExists: boolean;

    @Input() model: BlockValuesModel;
    @Input() schema: BlocksSchema;

    @Output() backEvent = new EventEmitter<BlockValuesModel>();
    @Output() valueChangedEvent = new EventEmitter<BlockValuesModel>();
    @Output() removeBlockEvent = new EventEmitter<BlockValuesModel>();

    form: FormGroup;
    get name() { return this.form.get('name'); }

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.schemaExists = !!this.schema[this.model.type];
        // this.form = this.fb.group({ name: [this.model.name, Validators.required] });
        this.form = this.fb.group({});
        if (this.schemaExists) {
            const schemaItem = this.schema[this.model.type];
            const requiredNameField = schemaItem.displayField;
            this.schema[this.model.type].settings.forEach(setting => {
                const name = setting.id;
                if (!!name) {
                    const validator = name === requiredNameField ? Validators.required : null;
                    this.form.addControl(name, this.fb.control(this.model[name], validator));
                }
            });
            this.form.valueChanges.subscribe(() => {
                this.valueChangedEvent.emit(this.getModel());
            });
        }
    }

    back() {
        // this value will be applyed onto current section in the editor.reducer
        // therefore i should not apply the uneditable properties
        const canBack = !this.schemaExists ||
            !this.schema[this.model.type].displayField ||
            this.form.get(this.schema[this.model.type].displayField).valid;
        if (canBack) {
            this.backEvent.emit(this.getModel());
        }
    }

    removeBlock() {
        this.removeBlockEvent.emit(this.model);
    }

    private getModel(): BlockValuesModel {
        const result = {
            ...this.model,
            ...this.form.value
        };
        return result;
    }
}
