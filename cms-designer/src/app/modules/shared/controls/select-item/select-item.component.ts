import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseControlComponent } from '../base-control.component';
import { OptionModel, SelectControlDescriptor } from '../../models';

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.component.html',
    styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent extends BaseControlComponent<SelectControlDescriptor> {

    @ViewChild('control') control: ElementRef;

    groupItems = false;
    groups: { [key: string]: { label: string; value: string; }[] };
    value: any;

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    initContent() {
        this.groupItems = this.descriptor.options.some(x => !!x.group);
        if (this.groupItems) {
            this.groups = {};
            this.descriptor.options.forEach(x => {
                if (!this.groups[x.group]) {
                    this.groups[x.group] = [];
                }
                this.groups[x.group].push(x);
            });
        }
    }

    getDisplayValue(option: OptionModel) {
        return this.sanitizer.bypassSecurityTrustHtml(option.label);
    }

    getTrackValue(option: OptionModel) {
        return option.value;
    }

    getFocusableControl(): ElementRef {
        return this.control;
    }
}
