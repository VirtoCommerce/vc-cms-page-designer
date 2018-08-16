import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-color-item',
    templateUrl: './color-item.component.html',
    styleUrls: ['./color-item.component.scss']
})
export class ColorItemComponent implements OnInit {

    @Input() model;
    @Input() theme;

    constructor() { }

    ngOnInit() { }

    valueChanged($event) {
        this.theme[this.model.id] = $event;
    }

}
