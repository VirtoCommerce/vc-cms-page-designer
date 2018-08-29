import { Input, Output, EventEmitter, Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-string-editor',
    templateUrl: './string-editor.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => StringEditorComponent),
        multi: true,
    }]
})
export class StringEditorComponent implements OnInit, ControlValueAccessor {

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
