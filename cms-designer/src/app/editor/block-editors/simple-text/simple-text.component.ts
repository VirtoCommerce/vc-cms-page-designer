import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-simple-text-editor',
    templateUrl: './simple-text.component.html'
})
export class SimpleTextComponent implements OnInit {

    static Key = 'text';

    @Input() model: any;

    constructor() { }

    ngOnInit() { }

}
