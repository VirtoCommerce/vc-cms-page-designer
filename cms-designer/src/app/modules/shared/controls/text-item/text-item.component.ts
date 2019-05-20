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
        // plugins: [ Alignment ],
        // alignment: { options: ['left', 'right', 'center', 'justify'] },
        // toolbar: [
        //     'heading', '|', 'bulletedList', 'numberedList', 'alignment', 'undo', 'redo'
        // ]
    };
    // private lastValue: string;

    // get mode(): string {
    //     // return this.context != null && this.context.mode === 'wide' ? 'snow' : 'bubble';
    //     return 'snow';
    // }

    // editorConfig = {
    //     toolbar: [
    //         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //         // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //         [{ 'align': [] }],
    //         ['link', 'image', 'video'],                       // link and image, video
    //         ['clean'],                                         // remove formatting button
    //         // [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
    //         ['blockquote', 'code-block'],
    //         // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //         // [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
    //         // [{ 'direction': 'rtl' }],                         // text direction


    //         [{ 'color': [ '#0c1015', '#b3b7d0' ] }, { 'background': [] }],          // dropdown with defaults from theme
    //         // [{ 'font': [] }],
    //     ]
    // };

    constructor() {
        super();
    }

    // setValue(value) {
    //     super.setValue(value);
    //     if (this.editor) {
    //         this.editor.root.innerHTML = this.value || '';
    //     }
    // }

    // onCreated(editor) {
    //     this.editor = editor;
    //     this.editor.root.innerHTML = this.value || '';
    //     this.lastValue = this.value || '';
    //     if (this.descriptor.autofocus) {
    //         // get text out of current context, because of editor need time to process html of current value
    //         setTimeout(() => {
    //             const position = this.editor.getText().length;
    //             this.editor.setSelection(position, 0, 'silent');
    //             this.editor.focus();
    //         });
    //     }
    // }

    registerOnChange(fn: any): void {
        this.onChange = (event) => {
            console.log(event);
            // fn(editor.getData());
        };
    }

    onReady(event) {
        // event.ui.view.height = '300px';
    }

    // private isTextChanged(event: any): boolean {
    //     const text = this.getText(this.lastValue);
    //     return text !== this.getText(event.html) && text !== this.getText(event.text);
    // }

    // private getText(value: string): string {
    //     if (!!value) {
    //         return value.trim();
    //     }
    //     return value;
    // }
}
