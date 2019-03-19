import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {

    @Input() storeUrl: SafeUrl;
    @Input() mode: string;
    @Input() loading: boolean;
    @Output() preivewLoaded = new EventEmitter<string>();

    isFullScreen = false;

    constructor() { }

    ngOnInit() { }

    preview1Loaded() {
        this.preivewLoaded.emit('preview1');
    }

    preview2Loaded() {
        this.preivewLoaded.emit('preview2');
    }

    toggleFullscreen() {
        this.isFullScreen = !this.isFullScreen;
    }
}
