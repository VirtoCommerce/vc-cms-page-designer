import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ControlDescriptor, CollectionControlDescriptor } from '../models';

@Injectable({
    providedIn: 'root'
})
export class FormHelper {

    generateForm(model: any, keys: ControlDescriptor[]): FormGroup {
        const result = new FormGroup({});
        keys.filter(x => !!x.id).forEach(descriptor => {
            const value = model[descriptor.id];
            if (descriptor.type === 'list') {
                const arrayDescriptor = <CollectionControlDescriptor>descriptor;
                // value is array here, so item is array element.
                // create group for each array item
                const groups = (value || []).map(item => this.generateForm(item, arrayDescriptor.element));
                result.addControl(descriptor.id, new FormArray(groups));
            } else {
                // there are validation rules may be here
                result.addControl(descriptor.id, new FormControl(value));
            }
        });
        return result;
    }
}
