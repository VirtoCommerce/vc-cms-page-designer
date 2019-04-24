import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {

    @Input() storeUrl: SafeUrl;
    @Input() error: boolean;
    @Input() mode: string;
    @Input() loading: boolean;
    @Output() preivewLoaded = new EventEmitter<string>();
    @Output() preivewLoadingError = new EventEmitter<any>();
    @Output() reloadClick = new EventEmitter<any>();
    @ViewChild('preview1') preview1: ElementRef<any>;
    @ViewChild('preview2') preview2: ElementRef<any>;

    hideUrl = false;
    isFullScreen = false;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() { }

    preview1Loaded() {
        if (!this.preview1) {
            return;
        }
        try {
            // console.log(this.preview1.nativeElement.contentWindow.document);
            const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.storeUrl);
            if (this.preview1.nativeElement.src === url) {
                this.preivewLoaded.emit('preview1');
            }
        } catch (error) {
            this.onErrorOccured(error);
        }
    }

    preview2Loaded() {
        if (!this.preview2) {
            return;
        }
        try {
            // console.log(this.preview2.nativeElement.contentWindow.document);
            const url = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.storeUrl);
            if (this.preview2.nativeElement.src === url) {
                this.preivewLoaded.emit('preview2');
            }
        } catch (error) {
            this.onErrorOccured(error);
        }
    }

    reloadIFrames() {
        this.reloadClick.emit();
        // this.error = false;
        // this.hideUrl = false;
        // this.loading = true;
    }

    toggleFullscreen() {
        this.isFullScreen = !this.isFullScreen;
    }

    onErrorOccured(error) {
        // this.error = true;
        // this.loading = false;
        // this.hideUrl = true;
        this.preivewLoadingError.emit(error);
    }
}
