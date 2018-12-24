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
    ChangeDetectionStrategy
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

    @ViewChild(ControlHostDirective) host: ControlHostDirective;
    @Input() descriptor: ControlDescriptor;
    @Input() group: FormGroup;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private controlsFactory: ControlsFactory) { }

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
            this.component.registerOnChange(fn);
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
