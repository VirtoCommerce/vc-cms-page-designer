import { Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'app-string-editor',
    templateUrl: './string-editor.component.html'
})
export class StringEditorComponent {
    @Input() title: string;
    @Input() model: any;
    @Output() modelChange = new EventEmitter<any>();
}
