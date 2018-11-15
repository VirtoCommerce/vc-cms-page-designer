import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { StringControlDescriptor } from '../../models';

@Component({
    selector: 'app-string-item',
    templateUrl: './string-item.component.html',
    styleUrls: ['./string-item.component.scss']
})
export class StringItemComponent extends BaseControlComponent<StringControlDescriptor> implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() { }
}
