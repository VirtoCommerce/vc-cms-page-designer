import { Injectable } from '@angular/core';
import { PageDescriptor } from '../modules/shared/models/page.descriptor';
import { CookieService } from 'ngx-cookie-service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

import { AppSettings } from './app.settings';

@Injectable({
    providedIn: 'root'
})
export class ApiUrlsService {

    private readonly SESSION_ID = 'sessionId';
    private params: PageDescriptor;

    constructor(private sanitizer: DomSanitizer, private cookies: CookieService) {
        const urlParams = new URLSearchParams(window.location.search);

        this.params = {
            storeId: urlParams.get('storeId'),
            path: urlParams.get('path'),
            contentType: urlParams.get('contentType'),
        };
        const index = this.params.path.lastIndexOf('/');
        this.params.filename = index !== -1 ? this.params.path.substr(index + 1) : this.params.path;
        this.params.uploadPath = index === -1 ? '' : this.params.path.substr(0, index - 1);
    }

    generateDownloadUrl(contentType: string, filepath: string): string {
        const path = encodeURIComponent(filepath || this.params.path);
        const url = `${AppSettings.platformUrl}/api/content/${contentType || this.params.contentType}/${this.params.storeId}`
            + `?relativeUrl=${path}`;
        return url;
    }

    generateUploadUrl(contentType: string = null, pathToUpload: string = null): string {
        const path = encodeURIComponent(pathToUpload || this.params.uploadPath);
        const type = contentType || this.params.contentType;
        const url = `${AppSettings.platformUrl}/api/content/${type}/${this.params.storeId}?folderUrl=${path}`;
        return url;
    }

    getStoreUrl(layout: string): SafeUrl {
        const query = `?preview_mode=${this.getCurrentSessionId()}${!!layout ? '&layout=' + layout : ''}`;
        const url = `${AppSettings.storeBaseUrl}${AppSettings.storePreviewPath}${query}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getCurrentSessionId(): string {
        const result = this.cookies.check(this.SESSION_ID)
            ? this.cookies.get(this.SESSION_ID)
            : this.generatePrefixAndSetCookie();
        return result;
    }

    chooseFilename(givenFilename: string): string {
        return givenFilename || this.params.filename;
    }

    getCategoriesEndPoint(): string {
        // /admin/api/catalog/listentries
        const url = `${AppSettings.platformUrl}/api/catalog/listentries`;
        return url;
    }

    getStoresEndPoint(): string {
        // /admin/api/stores/{Electronics}
        const url = `${AppSettings.platformUrl}/api/stores/${this.params.storeId}`;
        return url;
    }

    private generatePrefixAndSetCookie(): string {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv_-';
        const randomChar = () => characters[Math.floor(Math.random() * characters.length)];
        const result = Array.from({ length: 10 }, randomChar).join('');
        this.cookies.set(this.SESSION_ID, result);
        return result;
    }
}
