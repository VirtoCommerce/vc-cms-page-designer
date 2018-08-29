import { Component, Input, EventEmitter, Output, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextEditorComponent),
        multi: true,
    }]
})
export class TextEditorComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;

    value: string;

    constructor() { }

    ngOnInit(): void { }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        this.value = obj as string;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }

}
