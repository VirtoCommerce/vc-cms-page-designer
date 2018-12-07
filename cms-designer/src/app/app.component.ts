import { ApiUrlsService } from './services/api-url.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'cms-designer';
    storeUrl: SafeUrl;

    previewLoading$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>, private urls: ApiUrlsService) { }

    ngOnInit(): void {
        this.storeUrl = this.urls.getStoreUrl();

        this.previewLoading$ = this.store.pipe(select(fromRoot.getLoading));
    }

    // this.store.dispatch(new editorActions.PreviewReady('preview2'));

}
