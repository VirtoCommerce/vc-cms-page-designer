import { Component, Input, EventEmitter, Output, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'app-text-item',
    templateUrl: './text-item.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextItemComponent),
        multi: true,
    }]
})
export class TextItemComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;

    private editor: any;
    private value: string;

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

    constructor() { }

    ngOnInit(): void { }

    onChange = (_: any) => { };

    writeValue(obj: any): void {
        this.value = obj as string;
        if (this.editor != null) {
            this.editor.setText(this.value);
        }
}

    registerOnChange(fn: any): void {
        this.onChange = (value) => {
            fn(value.html);
        };
    }

    registerOnTouched(): void {
    }

    onCreated(editor) {
        this.editor = editor;
        this.editor.root.innerHTML = this.value || '';
    }

}
