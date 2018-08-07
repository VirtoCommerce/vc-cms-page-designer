import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tab',
    template: `<div [hidden]="!active"><ng-content></ng-content></div>`
})
export class TabComponent implements OnInit {

    @Input() tabTitle: string;
    @Input() active = false;

    constructor() { }

    ngOnInit() { }
}
