import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SchemaItemModel, PresetsModel } from '../models/';
import { PageDescriptor } from 'src/app/models/page.descriptor';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private http: HttpClient) { }

    loadPresets(params: PageDescriptor): Observable<PresetsModel> {
        const url = this.generateDownloadUrl(params);
        return this.http.get<PresetsModel>(url);
    }

    loadSchema(/* params: PageDescriptor */): Observable<SchemaItemModel[]> {
        // const url = this.generateUrl(params);
        return this.http.get<SchemaItemModel[]>('data/settings_schema.json');
    }

    uploadPresets(model: PresetsModel, params: PageDescriptor): Observable<any> {
        const url = this.generateUploadUrl(params);
        const form = new FormData();
        form.append('settings_data.json', JSON.stringify(model, null, 4));

        // return this.http.post<FileDescriptor[]>(url, form).pipe(
        //     map(x => x[0].url)
        // );
        return this.http.post(url, form);
    }

    private generateDownloadUrl(params: PageDescriptor): string {
        const path = encodeURIComponent('/default/config/settings_data.json');
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/themes/${params.storeId}`
            + `?relativeUrl=${path}&api_key=${environment.apiKey}`;
        return url;
    }

    private generateUploadUrl(params: PageDescriptor): string {
        const path = encodeURIComponent('/default/config');
        const url = `${environment.platformUrl}${environment.apiBaseUrl}/themes/${params.storeId}`
            + `?folderUrl=${path}&api_key=${environment.apiKey}`;
        return url;
    }
}
