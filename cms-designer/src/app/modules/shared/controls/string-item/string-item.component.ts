import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { StringControlDescriptor } from '../../models';

@Component({
    selector: 'app-string-item',
    templateUrl: './string-item.component.html',
    styleUrls: ['./string-item.component.scss']
})
export class StringItemComponent extends BaseControlComponent<StringControlDescriptor> {

    @ViewChild('control') control: ElementRef;

    constructor() {
        super();
    }

    getFocusableControl(): ElementRef {
        return this.control;
    }
}
