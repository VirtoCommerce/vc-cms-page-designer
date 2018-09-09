import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    @Input() storeUrl: SafeUrl;

    constructor() { }

    ngOnInit() { }

}
