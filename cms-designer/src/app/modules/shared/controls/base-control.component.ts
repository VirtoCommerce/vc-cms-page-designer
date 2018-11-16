import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDescriptor } from '../models';

export class BaseControlComponent<T extends BaseDescriptor> {
    @Input() descriptor: T;
    @Input() group: FormGroup;

    value: any;
    onChange = (_: any) => { };
    onTouched = (_: any) => { };

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    setValue(value: any) {
        this.value = value;
    }
}
