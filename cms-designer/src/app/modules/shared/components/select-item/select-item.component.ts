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

    @Input() label: string;
    @Input() options: { label: string; value: string; group?: string }[];
    @Input() valueName = 'value';
    @Input() valueLabel = 'label';

    group = false;
    groups: { [key: string]: { label: string; value: string; }[] };
    value: any;

    constructor() { }

    ngOnInit() {
        this.group = this.options.some(x => !!x.group);
        if (this.group) {
            this.groups = {};
            this.options.forEach(x => {
                if (!this.groups[x.group]) {
                    this.groups[x.group] = [];
                }
                this.groups[x.group].push(x);
            });
        }
    }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }

}
