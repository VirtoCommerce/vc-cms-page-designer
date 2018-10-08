import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-slider-item',
    templateUrl: './slider-item.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SliderItemComponent),
        multi: true,
    }]
})
export class SliderItemComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;
    @Input() min: number;
    @Input() max: number;

    value: string;

    constructor() { }

    ngOnInit() { }

    onTouched = (_: any) => { };

    onChange(event: any) {
        this.propagateChange(event.target.value);
    }

    writeValue(obj: any): void {
        this.value = obj as string;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private propagateChange = (_: any) => { };
}
