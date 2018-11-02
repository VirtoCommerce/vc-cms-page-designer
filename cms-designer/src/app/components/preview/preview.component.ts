import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import * as editorActions from '../../modules/editor/state/editor.actions';
import * as fromEditor from '../../modules/editor/state';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    @Input() storeUrl: SafeUrl;
    @Input() mode: string;
    @Input() progress = 0;
    // @ViewChild('wrapper') wrapperRef: ElementRef;

    isFullScreen = false;

    constructor(private store: Store<fromEditor.State>) { }

    ngOnInit() { }

    previewLoaded() {
        this.store.dispatch(new editorActions.PreviewReady());
    }

    onChangeMode(mode) {
        this.mode = mode;
    }

    toggleFullscreen() {
        this.isFullScreen = !this.isFullScreen;
    }
}
