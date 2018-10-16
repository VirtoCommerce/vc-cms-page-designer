import { Injectable } from '@angular/core';
import { PageDescriptor } from '../models/page.descriptor';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiUrlsService {
    generateDownloadUrl(params: PageDescriptor): string {
        const path = encodeURIComponent(params.path);
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/${params.contentType}/${params.storeId}`
            + `?relativeUrl=${path}&api_key=${environment.apiKey}`;
        return url;
    }

    generateUploadUrl(params: PageDescriptor): string {
        const path = encodeURIComponent(params.path);
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/${params.contentType}/${params.storeId}`
            + `?folderUrl=${path}&api_key=${environment.apiKey}`;
        return url;
    }
}
