import { ActionDescriptor } from 'src/app/models/action-descriptor.model';
import { OnInit, Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html'
})
export class ActionsDropdownComponent implements OnInit {

    isOpen = false;
    @Input() title: string;
    @Input() items: ActionDescriptor[];
    @Input() up: boolean;
    @Output() actionSelected = new EventEmitter<string>();

    ngOnInit(): void { }

    onActionSelected(type: string) {
        this.actionSelected.emit(type);
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }
}
