import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checkbox-item',
    templateUrl: './checkbox-item.component.html',
    styleUrls: ['./checkbox-item.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxItemComponent),
        multi: true,
    }]
})
export class CheckboxItemComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;

    value = false;

    constructor() { }

    ngOnInit() { }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        this.value = obj as boolean;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }

}
