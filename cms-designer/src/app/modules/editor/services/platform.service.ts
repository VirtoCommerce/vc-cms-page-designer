import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SectionModel, PageDescriptor, PageModel } from '../models/';
import { environment } from 'src/environments/environment';
import { tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(private http: HttpClient) { }

    loadPage(params: PageDescriptor): Observable<SectionModel[]> {
        const url = this.generateUrl(params);

        return this.http.get<SectionModel[]>(url);
    }

    uploadPage(page: SectionModel[], params: PageDescriptor): Observable<any> {
        const url = this.generateUrl(params);
        return this.http.post(url, page);
    }

    private generateUrl(params: PageDescriptor): string {
        const url = `${environment.platformUrl}${environment.contentUrl}${params.storeId}`
            + `?relativeUrl=${params.path}&api_key=${environment.apiKey}`;
        return url;
    }
}
