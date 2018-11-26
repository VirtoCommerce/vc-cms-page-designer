import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BlockSchema, BlockValuesModel } from 'src/app/modules/shared/models';
import { FormHelper } from '../../services/form.helper';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit {

    @Input() model: BlockValuesModel; // модель используется при создании формы, для получения значений
    @Input() schema: BlockSchema; // схема редактируемого блока

    @Output() modelChange = new EventEmitter<BlockValuesModel>();

    form: FormGroup;

    constructor(private formHelper: FormHelper) { }

    ngOnInit() {
        this.form = this.formHelper.generateForm(this.model, this.schema.settings);
        this.form.valueChanges.subscribe(value => {
            this.modelChange.emit(value);
        });
    }

    // private createFormRecursively(model: any, keys: ControlDescriptor[]): FormGroup {
    //     const result = new FormGroup({});
    //     keys.filter(x => !!x.id).forEach(descriptor => {
    //         const value = model[descriptor.id];
    //         if (descriptor.type === 'list') {
    //             const arrayDescriptor = <CollectionControlDescriptor>descriptor;
    //             // value is array here, so item is array element.
    //             // create group for each array item
    //             const groups = value.map(item => this.createFormRecursively(item, arrayDescriptor.element));
    //             result.addControl(descriptor.id, new FormArray(groups));
    //         } else {
    //             // there are validation rules may be here
    //             result.addControl(descriptor.id, new FormControl(value));
    //         }
    //     });
    //     return result;
    // }
}
