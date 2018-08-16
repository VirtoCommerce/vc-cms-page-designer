import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-text-item',
    templateUrl: './text-item.component.html',
    styleUrls: ['./text-item.component.scss']
})
export class TextItemComponent implements OnInit {

    @Input() model;
    @Input() theme;

    constructor() { }

    ngOnInit() {
    }

}
