import { ApiUrlsService } from './api-url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PageDescriptor } from 'src/app/models/page.descriptor';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(private http: HttpClient, private urls: ApiUrlsService) { }

    downloadModel<T>(params: PageDescriptor): Observable<T> {
        const url = this.urls.generateDownloadUrl(params);
        return this.http.get<T>(url);
    }

    uploadModel<T>(model: T, params: PageDescriptor, filename: string): Observable<any> {
        const url = this.urls.generateUploadUrl(params);
        const form = new FormData();
        form.append(filename, JSON.stringify(model, null, 4));
        return this.http.post(url, form);
    }
}
