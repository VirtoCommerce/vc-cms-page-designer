import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {

    private _originalUrl: SafeUrl;

    @Input() get storeUrl(): SafeUrl {
        return this.hideUrl ? null : this._originalUrl;
    }
    set storeUrl(value: SafeUrl) {
        this._originalUrl = value;
    }
    @Input() mode: string;
    @Input() loading: boolean;
    @Output() preivewLoaded = new EventEmitter<string>();
    @Output() preivewLoadingError = new EventEmitter<any>();
    @ViewChild('preview1') preview1: ElementRef<any>;
    @ViewChild('preview2') preview2: ElementRef<any>;

    error = false;
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
        } catch {
            this.handleError();
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
        } catch {
            this.handleError();
        }
    }

    reloadIFrames() {
        this.error = false;
        this.hideUrl = false;
        this.loading = true;
    }

    toggleFullscreen() {
        this.isFullScreen = !this.isFullScreen;
    }

    handleError() {
        this.error = true;
        this.loading = false;
        this.hideUrl = true;
        this.preivewLoadingError.emit();
    }
}
