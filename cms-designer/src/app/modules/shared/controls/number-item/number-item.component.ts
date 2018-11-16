import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from './../base-control.component';
import { NumberControlDescriptor } from '../../models';

@Component({
    selector: 'app-number-item',
    templateUrl: './number-item.component.html'
})
export class NumberItemComponent extends BaseControlComponent<NumberControlDescriptor> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() { }
}
