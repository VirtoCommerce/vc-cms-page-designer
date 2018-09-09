import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'cms-designer';
    storeUrl: SafeUrl;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.storeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.storeUrl);
    }
}
