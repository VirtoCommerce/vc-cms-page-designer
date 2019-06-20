import { Component, OnInit, Input } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { TextControlDescriptor } from '@shared/models';
import { AppSettings } from '@app/services';

@Component({
    selector: 'app-text-item',
    templateUrl: './text-item.component.html',
    styleUrls: ['./text-item.component.scss']
})
export class TextItemComponent extends BaseControlComponent<TextControlDescriptor> {

    config = {
        toolbar: [
            {
                name: 'basicstyles',
                items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
            },
            { name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight'] },
            { name: 'lists', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent'] },
            { name: 'insert', items: ['Anchor'] },
            { name: 'link', items: ['Link', 'Unlink'] },
            { name: 'styles', items: ['Format', 'Styles'] },
            { name: 'tools', items: ['Maximize'] },
            { name: 'document', items: ['Source'] }
        ],
        extraPlugins: 'stylescombo,justify',
        removeButtons: '',
        format_tags: 'p;h2;h3;h4',
        contentsCss: `${AppSettings.storeBaseUrl}${AppSettings.contentCssPath}`,
        stylesSet: [
            { name: 'Normal', element: 'p', attributes: [ ] },
            { name: 'Medium size text', element: 'p', attributes: { class: 'section__descr--medium' } },
            { name: 'Gray color text', element: 'p', attributes: { class: 'section__descr--gray' } }
        ]
    };

    constructor() {
        super();
    }

    registerOnChange(fn: any): void {
        this.onChange = (newValue) => {
            if (this.value !== newValue) {
                fn(newValue);
            }
        };
    }

    onReady(event) { }
}
