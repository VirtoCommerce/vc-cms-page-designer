import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PresetsModel } from '@themes/models';
import { BlockValuesModel, BlocksSchema } from '@shared/models';
import { EnvironmentSettings } from '@app/models';

import { AppSettings } from './app.settings';

@Injectable()
export class MockPlatformService {

    constructor(private http: HttpClient) { }

    downloadPreset<T>(filename: string): Observable<T> {
        return this.http.get<T>(`data/${filename}`);
    }

    uploadPreset(_model: PresetsModel): Observable<any> {
        return of({});
    }

    uploadDraftPreset(_model: PresetsModel): Observable<any> {
        return of({});
    }

    downloadPage(): Observable<BlockValuesModel[]> {
        return this.http.get<BlockValuesModel[]>('data/page_data.page');
    }

    uploadPage(_model: BlockValuesModel[]): Observable<any> {
        return of({});
    }

    donwloadBlocksSchema(): Observable<BlocksSchema> {
        return this.http.get<BlocksSchema>('data/blocks_schema.json');
    }

    initSettings(): Promise<any> {
        return this.http.get<EnvironmentSettings>('data/settings.json').pipe(
            tap(x => {
                Object.assign(AppSettings, x);
            })
        ).toPromise();
    }
}
