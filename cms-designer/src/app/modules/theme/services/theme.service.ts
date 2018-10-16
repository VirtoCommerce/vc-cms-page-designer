import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SchemaItemModel, PresetsModel } from '../models/';
import { PageDescriptor } from 'src/app/models/page.descriptor';
import { PlatformService } from 'src/app/services/platform.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private platform: PlatformService) { }

    loadPresets(params: PageDescriptor): Observable<PresetsModel> {
        const themeParams = this.prepareParams(params, 'settings_data.json');
        return this.platform.downloadModel<PresetsModel>(themeParams);
    }

    loadSchema(params: PageDescriptor): Observable<SchemaItemModel[]> {
        const themeParams = this.prepareParams(params, 'settings_schema.json');
        return this.platform.downloadModel<SchemaItemModel[]>(themeParams);
    }

    uploadPresets(model: PresetsModel, params: PageDescriptor): Observable<any> {
        const themeParams = this.prepareParams(params);
        return this.platform.uploadModel(model, themeParams, 'settings_data.json');
    }

    private prepareParams(params: PageDescriptor, filename: string = null): PageDescriptor {
        const themeParams = {
            ...params,
            contentType: 'themes',
            path: '/default/config' + (!!filename ? `/${filename}` : '')
        };
        return themeParams;
    }
}
