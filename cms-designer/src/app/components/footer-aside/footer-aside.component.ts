import { Input, Output, EventEmitter, OnInit, Component } from '@angular/core';

@Component({
    selector: 'app-footer-aside',
    templateUrl: './footer-aside.component.html'
})
export class FooterAsideComponent implements OnInit {

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
