import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { TextControlDescriptor } from '../../models';

@Component({
    selector: 'app-text-item',
    templateUrl: './text-item.component.html'
})
export class TextItemComponent extends BaseControlComponent<TextControlDescriptor> implements OnInit {

    private editor: any;

    editorConfig = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],                       // link and image, video
            ['clean']                                         // remove formatting button
            // [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
            // ['blockquote', 'code-block'],
            // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            // [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
            // [{ 'direction': 'rtl' }],                         // text direction


            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            // [{ 'font': [] }],


        ]
    };

    constructor() {
        super();
    }

    ngOnInit(): void { }

    onCreated(editor) {
        this.editor = editor;
        this.editor.root.innerHTML = this.value || '';
    }

    registerOnChange(fn: any): void {
        this.onChange = (event) => {
            if (this.value !== event.html) {
                fn(event.html);
            }
        };
    }
}
