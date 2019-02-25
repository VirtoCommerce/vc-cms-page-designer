import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterContentInit {

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    @Output() tabSelected = new EventEmitter<number>();

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
        this.tabSelected.emit(this.tabs.toArray().indexOf(tab));
    }

}
