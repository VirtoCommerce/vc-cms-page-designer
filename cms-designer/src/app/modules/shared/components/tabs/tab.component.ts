import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html'
})
export class TabComponent implements OnInit {

    @Input() tabTitle: string;
    @HostBinding('class.tabs__content--active') @Input() active = false;

    constructor() { }

    ngOnInit() { }
}
