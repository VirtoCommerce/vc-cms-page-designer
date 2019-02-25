import { Component } from '@angular/core';
import { AccItemComponent } from './acc-item.component';

@Component({
    selector: 'app-accordeon',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./accordeon.component.scss']
})
export class AccordeonComponent {

    panes: Array<AccItemComponent> = [];

    addPane(pane: AccItemComponent): void {
        this.panes.push(pane);
    }

    closeOthers(openPane: AccItemComponent): void {
        this.panes.forEach((pane: AccItemComponent) => {
            if (pane !== openPane) {
                pane.active = false;
            }
        });
    }

    removePane(pane: AccItemComponent): void {
        const index = this.panes.indexOf(pane);
        if (index !== -1) {
            this.panes.splice(index, 1);
        }
    }

}
