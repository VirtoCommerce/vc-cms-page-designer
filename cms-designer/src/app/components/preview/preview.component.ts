import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromEditor from '../../modules/editor/state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    @Input() storeUrl: SafeUrl;
    @Input() mode: string;
    @Input() loading: boolean;
    @Output() preivewLoaded = new EventEmitter<string>();

    isFullScreen = false;

    constructor() { }

    ngOnInit() { }

    primaryPreviewLoaded() {
        this.preivewLoaded.emit('preview1');
    }

    secondaryPreviewLoaded() {
        this.preivewLoaded.emit('preview2');
    }

    onChangeMode(mode) {
        this.mode = mode;
    }

    toggleFullscreen() {
        this.isFullScreen = !this.isFullScreen;
    }
}
