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
        extraPlugins: 'stylescombo',
        removeButtons: '',
        format_tags: 'p;h2;h3;h4',
        contentsCss: `${AppSettings.storeBaseUrl}${AppSettings.contentCssPath}`,
        stylesSet: [
            { name: 'Normal', element: 'p', attributes: [ ] },
            { name: 'Medium size text', element: 'p', attributes: { class: 'section__descr--medium' } },
            { name: 'Gray color text', element: 'p', attributes: { class: 'section__descr--gray' } }
        ]
        // [
        //     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        //     { name: 'colors', groups: [ 'colors' ] },
        //     { name: 'clipboard', groups: [ 'clipboard' ] },
        //     { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        //     { name: 'forms', groups: [ 'forms' ] },
        //     { name: 'paragraph', groups: [ 'align', 'list', 'indent', 'blocks', 'bidi', 'paragraph' ] },
        //     { name: 'links', groups: [ 'links' ] },
        //     { name: 'insert', groups: [ 'insert' ] },
        //     { name: 'styles', groups: [ 'styles' ] },
        //     { name: 'tools', groups: [ 'tools' ] },
        //     { name: 'others', groups: [ 'others' ] },
        //     { name: 'about', groups: [ 'about' ] },
        //     { name: 'document', groups: [ 'mode', 'document', 'doctools' ] }
        // ],
        // removeButtons:
        //     'Find,SelectAll,Scayt,Replace,Cut,Copy,Paste,PasteText,Save,NewPage,Preview,Print,Templates,Form,Checkbox,' +
        //     'Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,BidiLtr,BidiRtl,Language,Flash,' +
        //     'HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,ShowBlocks,About,CreateDiv,undo'
    };

    constructor() {
        super();
    }

    registerOnChange(fn: any): void {
        this.onChange = (newValue) => {
            if (this.value !== newValue) {
                console.log(this.value, newValue);
                fn(newValue);
            }
        };
    }

    onReady(event) { }
}
