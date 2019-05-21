import { Input, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDescriptor, BlockSchema } from '@shared/models';

export class BaseControlComponent<T extends BaseDescriptor> implements OnInit, AfterContentInit {
    @Input() descriptor: T;
    @Input() group: FormGroup;
    @Input() context: any;

    parentClass = 'form-group';
    @Input() value: any;
    onChange = (_: any) => { };
    onTouched = (_: any) => { };

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    setValue(value: any) {
        if (!value) {
            value = null;
        }
        this.value = value;
    }

    ngOnInit() {
        this.initContent();
    }

    ngAfterContentInit(): void {
        if (this.descriptor.autofocus) {
            // child must not change the value of parent properties
            // but focus change the parent form (un)touched property indirectly
            // to avoid the ExpressionChangedAfterItHasBeenCheckedError focus should be changed outside the digest cycle
            setTimeout(() => {
                this.setFocus();
            });
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
