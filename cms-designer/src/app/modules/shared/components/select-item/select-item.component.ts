import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseControlComponent } from '../base-control.component';
import { OptionModel, SelectControlDescriptor } from '../../models';

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.component.html',
    styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent extends BaseControlComponent<SelectControlDescriptor> implements OnInit {

    group = false;
    groups: { [key: string]: { label: string; value: string; }[] };
    value: any;

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    ngOnInit() {
        this.group = this.descriptor.options.some(x => !!x.group);
        if (this.group) {
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
}
