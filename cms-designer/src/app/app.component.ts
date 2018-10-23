import { ApiUrlsService } from './services/api-url.service';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'cms-designer';
    storeUrl: SafeUrl;

    constructor(private urls: ApiUrlsService) { }

    ngOnInit(): void {
        this.storeUrl = this.urls.getStoreUrl();
    }
}
