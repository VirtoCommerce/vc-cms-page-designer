import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-color-item',
    templateUrl: './color-item.component.html',
    styleUrls: ['./color-item.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ColorItemComponent),
        multi: true,
    }]
})
export class ColorItemComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;
    value: string;

    constructor() { }

    ngOnInit() { }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        this.value = obj as string;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }

}
