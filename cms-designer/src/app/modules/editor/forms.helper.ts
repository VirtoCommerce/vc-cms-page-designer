import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isArray } from 'util';

@Injectable({
    providedIn: 'root'
})
export class FormsHelper {

    constructor(private fb: FormBuilder) { }

    fillFormRecursively(model: any, form?: FormGroup, keys?: string[]) {
        if (!keys) {
            keys = Object.keys(model);
        }
        if (!form) {
            form = this.fb.group({});
        }
        keys.forEach(x => {
            const m = model[x];
            if (isArray(m)) {
                const groups = m.map(b => this.fillFormRecursively(b));
                form.addControl(x, this.fb.array(groups));
            } else {
                form.addControl(x, this.fb.control(m));
            }
        });
        return form;
    }
}
