import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SectionModel, PageModel } from '../models/';
import { environment } from 'src/environments/environment';
import { PageDescriptor } from 'src/app/models/page.descriptor';

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
        const url = `${environment.platformUrl}${environment.apiBaseUrl}${environment.pageUrl}${params.storeId}`
            + `?relativeUrl=${params.path}&api_key=${environment.apiKey}`;
        return url;
    }
}
