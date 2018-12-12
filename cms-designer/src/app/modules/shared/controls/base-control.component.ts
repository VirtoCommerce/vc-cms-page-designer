import { Input, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDescriptor, BlockSchema } from '../models';

export class BaseControlComponent<T extends BaseDescriptor> implements OnInit, AfterContentInit {
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

    ngOnInit() {
        this.initContent();
    }

    ngAfterContentInit(): void {
        if (this.descriptor.autofocus) {
            this.setFocus();
        }
    }

    setFocus() {
        const control = this.getFocusableControl();
        if (control) {
            control.nativeElement.focus();
        }
    }

    getFocusableControl(): ElementRef {
        return null;
    }

    initContent() { }
}
