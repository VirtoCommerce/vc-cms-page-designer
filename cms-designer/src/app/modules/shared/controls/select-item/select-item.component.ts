import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseControlComponent } from '../base-control.component';
import { OptionModel, SelectControlDescriptor } from '@shared/models';

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.component.html',
    styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent extends BaseControlComponent<SelectControlDescriptor> {

    groupItems = false;
    groups: { [key: string]: { label: string; value: string; }[] };
    value: OptionModel;
    isOpen: boolean;

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

    setValue(value: any) {
        const v = !value && this.descriptor.default ? this.descriptor.default : value;
        this.value = this.descriptor.options.find(x => x.value === v);
    }

    getTitle(): string {
        return !!this.value ? this.value.label : this.descriptor.placeholder;
    }

    getDisplayValue(option: OptionModel) {
        return this.sanitizer.bypassSecurityTrustHtml(option.label);
    }

    getTrackValue(option: OptionModel) {
        return option.value;
    }

    selectValue(option: OptionModel) {
        this.value = option;
        this.isOpen = false;
        this.onChange(option.value);
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }
}
