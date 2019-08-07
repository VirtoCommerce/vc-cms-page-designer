import { Input, Output, EventEmitter, OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-header-aside',
    templateUrl: './header-aside.component.html',
    styles: [`
        :host {
            max-width: 100%;
        }
        :host .header-text {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    `]
})
export class HeaderAsideComponent implements OnInit {

    @Input() title: string;
    @Input() active: boolean;
    @Input() icon: string;
    @Output() buttonClick = new EventEmitter<any>();

    ngOnInit() { }

    onButtonClick() {
        if (this.active) {
            this.buttonClick.emit();
        }
    }
}
