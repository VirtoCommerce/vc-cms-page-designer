import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    @Input() storeUrl: SafeUrl;
    // @ViewChild('preview') previewRef: ElementRef;
    // private get preview() { return (<any>this.previewRef.nativeElement).contentWindow; }

    constructor() { }

    ngOnInit() {
        // this.preview
    }

    previewLoaded() {
        console.log('preview loaded');
    }
}
