import { Component } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { UrlControlDescriptor, OptionModel } from '@shared/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-url-item',
    templateUrl: './url-item.component.html',
    styleUrls: ['./url-item.component.scss']
})
export class UrlItemComponent extends BaseControlComponent<UrlControlDescriptor> {
    isOpenSelect: boolean;
    isOpen: boolean;
    valueInSelect: OptionModel;

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    onValueChange(value: any) {
        this.setValue({
            ...this.value,
            ...value
        });
        this.onChange(this.value);
    }

    getTrackValue(option: OptionModel) {
        return option.value;
    }

    selectValue(option: OptionModel) {
        this.valueInSelect = option;
        this.isOpenSelect = false;
        this.onValueChange({ style: option.value });
    }

    getTitle(): string {
        return !!this.valueInSelect ? this.valueInSelect.label : this.descriptor.placeholder;
    }

    getDisplayValue(option: OptionModel) {
        return this.sanitizer.bypassSecurityTrustHtml(option.label);
    }

    toggleSelect() {
        this.isOpenSelect = !this.isOpenSelect;
    }

    toggleControl(event) {
        event.preventDefault();
        this.isOpen = !this.isOpen;
    }

    setValue(value: any) {
        if (!value) {
            value = { url: null, urlText: null, style: null };
        }
        const result = { ...this.value, ...value };
        this.valueInSelect = this.descriptor.styles && this.descriptor.styles.length
            ? this.descriptor.styles.find(x => x.value === value.style)
            : null;
        super.setValue(result);
    }
}
