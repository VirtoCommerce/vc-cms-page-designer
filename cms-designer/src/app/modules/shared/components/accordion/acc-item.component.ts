import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AccordeonComponent } from './accordion.component';

@Component({
    selector: 'app-acc-item',
    templateUrl: './acc-item.component.html',
    styleUrls: ['./acc-item.component.scss']
})
export class AccItemComponent implements OnInit, OnDestroy {

    private _active = false;

    @Input() title: string;
    @Input() set active(value: boolean) {
        this._active = value;
        if (value) {
            this.accordeon.closeOthers(this);
        }
    }

    get active() {
        return this._active;
    }

    constructor(private accordeon: AccordeonComponent) {
        accordeon.addPane(this);
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.accordeon.removePane(this);
    }

    toggleOpen(event: MouseEvent) {
        event.preventDefault();
        this.active = !this.active;
    }
}
