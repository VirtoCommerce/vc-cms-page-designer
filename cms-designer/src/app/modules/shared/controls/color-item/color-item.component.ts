import { Component, OnInit } from '@angular/core';
import { ColorControlDescriptor } from './../../models/color-control.descriptor';
import { BaseControlComponent } from './../base-control.component';

@Component({
    selector: 'app-color-item',
    templateUrl: './color-item.component.html',
    styleUrls: ['./color-item.component.scss']
})
export class ColorItemComponent extends BaseControlComponent<ColorControlDescriptor> {

    constructor() {
        super();
    }

    registerOnChange(fn: any): void {
        this.onChange = value => {
            this.value = value;
            fn(value);
        };
    }
}
