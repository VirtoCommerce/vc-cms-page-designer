import { ActionDescriptor } from 'src/app/models/action-descriptor.model';
import { OnInit, Input, Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html'
})
export class ActionsDropdownComponent implements OnInit {

    @Input() title: string;
    @Input() items: ActionDescriptor[];
    @Output() actionSelected = new EventEmitter<string>();

    ngOnInit(): void { }

    onActionSelected(type: string) {
        this.actionSelected.emit(type);
    }
}
