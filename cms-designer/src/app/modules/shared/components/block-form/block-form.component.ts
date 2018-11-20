import { BlockSchema, BlockValuesModel, CollectionControlDescriptor } from 'src/app/modules/shared/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ControlDescriptor } from '../../models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlsFactory } from '../../controls/controls.factory';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit {

    @Input() model: BlockValuesModel; // модель используется при создании формы, для получения значений
    @Input() schema: BlockSchema; // схема редактируемого блока

    @Output() modelChange = new EventEmitter<BlockValuesModel>();

    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        const formDescriptor = this.fillFormRecursively(this.model, {}, this.schema.settings);
        this.form = this.fb.group(formDescriptor);
        this.form.valueChanges.subscribe(value => {
            console.log('value changed form');
            this.modelChange.emit(value);
        });
    }

    private fillFormRecursively(model: any, form: any, keys: ControlDescriptor[]): FormGroup {
        keys.filter(x => !!x.id).forEach(descriptor => {
            const value = model[descriptor.id];
            if (descriptor.type === 'list') {
                const arrayDescriptor = <CollectionControlDescriptor>descriptor;
                // value is array here, so item is array element.
                const groups = value.map(item => this.fillFormRecursively(item, this.fb.group({}), arrayDescriptor.element));
                form[descriptor.id] = groups;
            } else {
                // there are validation rules may be here
                form[descriptor.id] = [value];
            }
        });
        return form;
    }
}
