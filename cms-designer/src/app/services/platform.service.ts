import { PresetsModel } from './../modules/theme/models/presets.model';
import { ApiUrlsService } from './api-url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SectionModel } from '../modules/editor/models';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(private http: HttpClient, private urls: ApiUrlsService) { }

    downloadPreset<T>(filename: string): Observable<T> {
        return this.downloadModel<T>('themes', `/default/config/${filename}`);
    }

    uploadPreset(model: PresetsModel): Observable<any> {
        return this.uploadModel<PresetsModel>(model, 'themes', '/default/config', 'settings_data.json');
    }

    uploadDraftPreset(model: PresetsModel): Observable<any> {
        return this.uploadModel<PresetsModel>(model, 'themes', '/default/config/drafts', this.generateDraftPresetName());
    }

    downloadPage(): Observable<SectionModel[]> {
        return this.downloadModel<SectionModel[]>();
    }

    uploadPage(model: SectionModel[]): Observable<any> {
        return this.uploadModel<SectionModel[]>(model);
    }

    private downloadModel<T>(contentType: string = null, filepath: string = null): Observable<T> {
        const url = this.urls.generateDownloadUrl(contentType, filepath);
        return this.http.get<T>(url);
    }

    private uploadModel<T>(model: T, contentType: string = null, pathToUpload: string = null, filename: string = null): Observable<any> {
        const url = this.urls.generateUploadUrl(contentType, pathToUpload);
        const form = new FormData();
        form.append(this.urls.chooseFilename(filename), JSON.stringify(model, null, 4));
        return this.http.post(url, form);
    }

    private generateDraftPresetName(): string {
        const prefix = this.urls.getCurrentSessionId();
        return `${prefix}_settings_data.json`;
    }

}
