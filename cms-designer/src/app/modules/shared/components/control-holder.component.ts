import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';

import { BaseControlComponent } from '../controls/base-control.component';
import { ControlsFactory } from '../controls/controls.factory';
import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnInit,
    ViewChild,
    forwardRef,
    ChangeDetectionStrategy,
    HostBinding,
    ChangeDetectorRef
} from '@angular/core';
import { ControlHostDirective } from './control-host.directive';
import { ControlDescriptor, BaseDescriptor } from '../models';

@Component({
    selector: 'app-control-holder',
    template: `<ng-template appControlHost></ng-template>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlHolderComponent),
        multi: true,
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlHolderComponent implements OnInit, ControlValueAccessor {

    private component: BaseControlComponent<BaseDescriptor>;
    private _context: any;

    @ViewChild(ControlHostDirective) host: ControlHostDirective;
    @Input() descriptor: ControlDescriptor;
    @Input() group: FormGroup;
    @Input() get context(): any {
        return this._context;
    }
    set context(value: any) {
        this._context = value;
        if (this.component) {
            this.component.context = value;
            this.cdr.detectChanges();
        }
    }
    @HostBinding('class') css: string;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private controlsFactory: ControlsFactory,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const type = this.controlsFactory.resolve(this.descriptor.type);
        if (!type) {
            console.log('unknown component type:', this.descriptor);
        } else {
            const factory = this.componentFactoryResolver.resolveComponentFactory(type);
            const container = this.host.viewContainerRef;

            container.clear();
            this.component = container.createComponent(factory).instance;
            this.component.descriptor = this.descriptor;
            this.component.group = this.group;
            this.component.context = this.context;
            this.css = this.component.parentClass;
        }
    }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        if (this.component) {
            this.component.setValue(obj);
        }
    }

    registerOnChange(fn: any): void {
        if (this.component) {
            this.component.registerOnChange((event) => {
                fn(event);
                this.cdr.detectChanges();
            });
        }
    }

    registerOnTouched(fn: any): void {
        if (this.component) {
            this.component.onTouched = fn;
        }
    }

    get changeDetection() {
        console.log(1);
        return true;
    }
}
