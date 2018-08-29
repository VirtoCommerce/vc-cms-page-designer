import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text-item',
    templateUrl: './text-item.component.html',
    styleUrls: ['./text-item.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextItemComponent),
        multi: true,
    }]
})
export class TextItemComponent implements OnInit, ControlValueAccessor {

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
