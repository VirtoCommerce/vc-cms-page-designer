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

    constructor(private fb: FormBuilder, private factory: ControlsFactory) { }

    ngOnInit() {
        this.form = this.fb.group({});
        this.form.valueChanges.subscribe(value => {
            this.modelChange.emit(value);
        });
        this.fillFormRecursively(this.model, this.form, this.schema.settings);
    }

    private fillFormRecursively(model: any, form: FormGroup, keys: ControlDescriptor[]): FormGroup {
        keys.filter(x => !!x.id).forEach(descriptor => {
            const value = model[descriptor.id];
            if (this.factory.descriptorForCollection(descriptor)) {
                const arrayDescriptor = <CollectionControlDescriptor>descriptor;
                // value is array here, so item is array element.
                const groups = value.map(item => this.fillFormRecursively(item, this.fb.group({}), arrayDescriptor.element));
                form.addControl(descriptor.id, this.fb.array(groups));
            } else {
                form.addControl(descriptor.id, this.fb.control(value));
            }
        });
        return form;
    }
}
