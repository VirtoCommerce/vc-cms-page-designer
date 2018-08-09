import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.component.html',
    styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {

    @Input() model;
    @Input() theme;

    constructor() { }

    ngOnInit() {
    }

}
