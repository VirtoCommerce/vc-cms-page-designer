import { ApiUrlsService } from './services/api-url.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import * as fromRoot from './state';
import * as fromEditor from './modules/editor/state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'cms-designer';
    storeUrl: SafeUrl;

    previewLoading$ = this.store.pipe(select(fromRoot.getPreviewLoading));

    constructor(private store: Store<fromRoot.State>, private editorStore: Store<fromEditor.State>, private urls: ApiUrlsService) { }

    ngOnInit(): void {
        this.editorStore.pipe(select(fromEditor.getPage)).pipe(
            filter(x => !!x),
            distinctUntilChanged((x, y) => x.settings['layout'] === y.settings['layout'])
        ).subscribe(x => {
            this.storeUrl = this.urls.getStoreUrl(<string>x.settings['layout']);
        });
    }
}
