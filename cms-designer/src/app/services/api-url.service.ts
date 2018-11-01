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
    private params: PageDescriptor;

    constructor(private sanitizer: DomSanitizer, private cookies: CookieService) {
        const urlParams = new URLSearchParams(window.location.search);

        const index = this.params.path.lastIndexOf('/');
        const filename = index !== -1 ? this.params.path.substr(index + 1) : this.params.path;
        const uploadPath = index === -1 ? '' : this.params.path.substr(0, index - 1);

        this.params = {
            storeId: urlParams.get('storeId'),
            path: urlParams.get('path'),
            contentType: urlParams.get('contentType'),
            filename: filename,
            uploadPath: uploadPath
        };
    }

    generateDownloadUrl(contentType: string, filepath: string): string {
        const path = encodeURIComponent(filepath || this.params.path);
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/${contentType || this.params.contentType}/${this.params.storeId}`
            + `?relativeUrl=${path}`;
        return url;
    }

    generateUploadUrl(pathToUpload: string = null): string {
        const path = encodeURIComponent(pathToUpload || this.params.path);
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/${this.params.contentType}/${this.params.storeId}`
            + `?folderUrl=${path}`;
        return url;
    }

    getStoreUrl(safe = true): SafeUrl|string {
        const url = `${environment.storeBaseUrl}${environment.storePreviewPath}?preview_mode=${this.getCurrentSessionId()}`;
        return safe ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : url;
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
        return null;
    }

    getStoresEndPoint(): string {
        return null;
    }

    private generatePrefixAndSetCookie(): string {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmnopqrstuv_-';
        const randomChar = () => characters[Math.floor(Math.random() * characters.length)];
        const result = Array.from({ length: 10 }, randomChar).join('');
        this.cookies.set(this.SESSION_ID, result);
        return result;
    }
}
