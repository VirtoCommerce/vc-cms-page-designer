import { PresetsModel } from './../modules/theme/models/presets.model';
import { ApiUrlsService } from './api-url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PageDescriptor } from 'src/app/models/page.descriptor';
import { SectionModel } from '../modules/editor/models';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    private params: PageDescriptor;

    constructor(private http: HttpClient, private urls: ApiUrlsService) {
        const urlParams = new URLSearchParams(window.location.search);
        this.params = {
            storeId: urlParams.get('storeId'),
            path: urlParams.get('path'),
            contentType: urlParams.get('contentType')
        };
    }

    downloadPreset<T>(filename: string): Observable<T> {
        const params = this.createPresetParams(filename);
        return this.downloadModel<T>(params);
    }

    uploadPreset(model: PresetsModel, filename: string): Observable<any> {
        const params = this.createPresetParams();
        return this.uploadModel<PresetsModel>(model, params, filename);
    }

    downloadPage(): Observable<SectionModel[]> {
        return this.downloadModel<SectionModel[]>(this.params);
    }

    uploadPage(model: SectionModel[]): Observable<any> {
        const index = this.params.path.lastIndexOf('/');
        const filename = index !== -1 ? this.params.path.substr(index + 1) : this.params.path;
        const uploadParams = {
            ...this.params,
            path: index === -1 ? '' : this.params.path.substr(0, index - 1)
        };
        return this.uploadModel<SectionModel[]>(model, uploadParams, filename);
    }

    private downloadModel<T>(params: PageDescriptor): Observable<T> {
        const url = this.urls.generateDownloadUrl(params);
        return this.http.get<T>(url);
    }

    private uploadModel<T>(model: T, params: PageDescriptor, filename: string): Observable<any> {
        const url = this.urls.generateUploadUrl(params);
        const form = new FormData();
        form.append(filename, JSON.stringify(model, null, 4));
        return this.http.post(url, form);
    }

    private createPresetParams(filename: string = null) {
        const result = {
            ...this.params,
            contentType: 'themes',
            path: '/default/config' + (!!filename ? `/${filename}` : '')
        };
        return result;
    }
}
