import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.component.html',
    styleUrls: ['./select-item.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectItemComponent),
        multi: true,
    }]
})
export class SelectItemComponent implements OnInit, ControlValueAccessor {

    @Input() label;
    @Input() options;
    @Input() valueName = 'value';
    @Input() valueLabel = 'label';

    value: any;

    constructor() { }

    ngOnInit() { }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }

}
