import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
    selector: 'app-tabs',
    template: `
        <div class="nav">
            <div class="tab" *ngFor="let tab of tabs" (click)="selectTab($event, tab)" [class.active]="tab.active">
                <a href="#">{{tab.tabTitle}}</a>
            </div>
        </div>
        <ng-content></ng-content>
    `,
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    constructor() { }

    ngAfterContentInit() {
        const activeTabs = this.tabs.filter(tab => tab.active);
        if (activeTabs.length === 0) {
            this.selectTab(null, this.tabs.first);
        }
    }

    selectTab(event: MouseEvent, tab: TabComponent) {
        if (event) {
            event.preventDefault();
        }
        this.tabs.toArray().forEach(t => t.active = false);
        tab.active = true;
    }

}
