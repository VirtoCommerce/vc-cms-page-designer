import { Injectable } from '@angular/core';
import { PageDescriptor } from '../models/page.descriptor';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ApiUrlsService {

    private readonly SESSION_ID = 'sessionId';

    constructor(private sanitizer: DomSanitizer, private cookies: CookieService) { }

    generateDownloadUrl(params: PageDescriptor): string {
        const path = encodeURIComponent(params.path);
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/${params.contentType}/${params.storeId}`
            + `?relativeUrl=${path}`;
        return url;
    }

    generateUploadUrl(params: PageDescriptor): string {
        const path = encodeURIComponent(params.path);
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/${params.contentType}/${params.storeId}`
            + `?folderUrl=${path}`;
        return url;
    }

    getStoreUrl(): SafeUrl {
        const url = `${environment.storeBaseUrl}${environment.storePreviewPath}?preview_mode=${this.getCurrentSessionId()}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getCurrentSessionId(): string {
        const result = this.cookies.check(this.SESSION_ID)
            ? this.cookies.get(this.SESSION_ID)
            : this.generatePrefixAndSetCookie();
        return result;
    }

    private generatePrefixAndSetCookie(): string {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv_-';
        const randomChar = () => characters[Math.floor(Math.random() * characters.length)];
        const result = Array.from({ length: 10 }, randomChar).join('');
        this.cookies.set(this.SESSION_ID, result);
        return result;
    }
}
