import { Component, OnInit, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { BaseControlComponent } from './../base-control.component';
import { NumberControlDescriptor } from '@shared/models';

@Component({
    selector: 'app-number-item',
    templateUrl: './number-item.component.html'
})
export class NumberItemComponent extends BaseControlComponent<NumberControlDescriptor> {

    @ViewChild('control') control: ElementRef<HTMLInputElement>;

    constructor() {
        super();
    }

    getFocusableControl(): ElementRef {
        return this.control;
    }
}
