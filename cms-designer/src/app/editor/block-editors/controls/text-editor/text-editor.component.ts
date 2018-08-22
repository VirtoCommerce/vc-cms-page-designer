import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html'
})
export class TextEditorComponent {
    @Input() title: string;
    @Input() model: any;
    @Output() modelChange = new EventEmitter<any>();
}
