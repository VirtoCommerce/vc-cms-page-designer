import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
    @ViewChild('preview') previewRef: ElementRef;
    private get preview() { return (<any>this.previewRef.nativeElement).contentWindow; }

    constructor(private store: Store<fromEditor.State>) { }

    ngOnInit() {
        // this.preview
    }

    previewLoaded() {
        this.store.dispatch(new editorActions.PreviewReady(this.preview));
    }
}
