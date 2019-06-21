import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiUrlsService } from './api-url.service';
import { PresetsModel } from '@themes/models';
import { BlockValuesModel, BlocksSchema } from '@shared/models';
import { EnvironmentSettings } from '@app/models';
import { WindowRef } from './window-ref';

import { AppSettings } from './app.settings';

@Injectable()
export class PlatformService {

    constructor(private http: HttpClient, private urls: ApiUrlsService, private windowRef: WindowRef) { }

    downloadPreset<T>(filename: string): Observable<T> {
        return this.downloadModel<T>('themes', `/default/config/${filename}`);
    }

    uploadPreset(model: PresetsModel): Observable<any> {
        return this.uploadModel<PresetsModel>(model, 'themes', '/default/config', 'settings_data.json');
    }

    uploadDraftPreset(model: PresetsModel): Observable<any> {
        return this.uploadModel<PresetsModel>(model, 'themes', '/default/config/drafts', this.generateDraftPresetName());
    }

    downloadPage(): Observable<BlockValuesModel[]> {
        return this.downloadModel<BlockValuesModel[]>();
    }

    uploadPage(model: BlockValuesModel[]): Observable<any> {
        return this.uploadModel<BlockValuesModel[]>(model);
    }

    donwloadBlocksSchema(): Observable<BlocksSchema> {
        return this.downloadModel<BlocksSchema>('themes', '/default/config/blocks_schema.json');
    }

    initSettings(): Promise<any> {
        return this.http.get<EnvironmentSettings>('data/settings.json').pipe(
            tap(x => {
                Object.assign(AppSettings, x);
                if (!AppSettings.platformUrl) {
                    AppSettings.platformUrl = this.windowRef.nativeWindow.location.origin + '/';
                }
            })
        ).toPromise();
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
