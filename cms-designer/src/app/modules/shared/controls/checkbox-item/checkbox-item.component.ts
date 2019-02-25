import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { CheckboxControlDescriptor } from '@shared/models';

@Component({
    selector: 'app-checkbox-item',
    templateUrl: './checkbox-item.component.html',
    styleUrls: ['./checkbox-item.component.scss']
})
export class CheckboxItemComponent extends BaseControlComponent<CheckboxControlDescriptor> {

    constructor() {
        super();
    }

    toggle() {
        this.value = !this.value;
    }
}
