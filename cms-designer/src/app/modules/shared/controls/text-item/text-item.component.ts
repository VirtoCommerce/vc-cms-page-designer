import { Component, OnInit, Input } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { TextControlDescriptor } from '@shared/models';

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
            { name: 'insert', items: ['Image', 'Table', 'Anchor'] },
            { name: 'link', items: ['Link', 'Unlink'] },
            { name: 'styles', items: ['Format', 'FontSize'] },
            { name: 'tools', items: ['Maximize'] },
            { name: 'document', items: ['Source'] }
        ],
        extraPlugins: 'font',
        removeButtons: ''

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
        this.onChange = (event) => {
            fn(event.editor.getData());
        };
    }

    onReady(event) { }
}
