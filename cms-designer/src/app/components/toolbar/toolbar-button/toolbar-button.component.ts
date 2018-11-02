import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toolbar-button',
    templateUrl: './toolbar-button.component.html'
})
export class ToolbarButtonComponent {
    @Input() icon: string;
    @Input() title: string;
    @Output() buttonClick = new EventEmitter<any>();

    onClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.buttonClick.emit();
    }
}
