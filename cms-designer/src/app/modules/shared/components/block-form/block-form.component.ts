import { CollectionControlDescriptor } from './../../models/collection-control.descriptor';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DisplayTextControlDescriptor, BlockSchema, ValueType, ControlDescriptor } from '../../models';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() schema: BlockSchema;
    @Input() model: { [key: string]: ValueType };

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.fillFormRecursively(this.model, this.group, this.schema.settings);
    }

    private fillFormRecursively(model: any, form: FormGroup, keys: ControlDescriptor[]): FormGroup {
        keys.filter(x => !!x.id).forEach(descriptor => {
            const value = model[descriptor.id];
            if (this.descriptorForCollection(descriptor)) {
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

    getContent(el: DisplayTextControlDescriptor) {
        return el.content;
    }

    getInfo(el) {
        if (!!el) {
            return el.info;
        }
        return null;
    }

    getFormControlName(descriptor: ControlDescriptor): string {
        if (this.descriptorForCollection(descriptor)) {
            return null;
        }
        return descriptor.id;
    }

    getFormArrayName(descriptor: ControlDescriptor): string {
        if (!this.descriptorForCollection(descriptor)) {
            return null;
        }
        return descriptor.id;
    }

    private descriptorForCollection(descriptor: ControlDescriptor): boolean {
        // todo: bad practice. const used twice, here and in the control factory
        return descriptor.type === 'collection';
    }
}
