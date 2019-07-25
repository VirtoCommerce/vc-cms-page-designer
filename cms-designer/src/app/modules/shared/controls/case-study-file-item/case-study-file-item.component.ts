import { Component, ViewChild, ElementRef } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { StringControlDescriptor } from '@shared/models';

@Component({
    selector: 'case-study-file-item',
    templateUrl: './case-study-file-item.component.html',
    styleUrls: ['./case-study-file-item.component.scss']
})
export class CaseStudyFileItemComponent extends BaseControlComponent<StringControlDescriptor> {

    @ViewChild('control') control: ElementRef;

    constructor() {
        super();
    }

    getFocusableControl(): ElementRef {
        return this.control;
    }
}
