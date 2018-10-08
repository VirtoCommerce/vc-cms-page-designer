import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-string-item',
    templateUrl: './string-item.component.html',
    styleUrls: ['./string-item.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => StringItemComponent),
        multi: true,
    }]
})
export class StringItemComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;

    value: string;

    constructor() { }

    ngOnInit() { }

    onTouched = (_: any) => { };

    onChange(event: any) {
        this.propagateChange(event.target.value);
    }

    writeValue(obj: any): void {
        this.value = obj || '';
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private propagateChange = (_: any) => { };
}
