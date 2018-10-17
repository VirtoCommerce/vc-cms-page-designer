import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SchemaItemModel, PresetsModel } from '../models/';
import { PlatformService } from 'src/app/services/platform.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private platform: PlatformService) { }

    loadPresets(): Observable<PresetsModel> {
        return this.platform.downloadPreset<PresetsModel>('settings_data.json');
    }

    loadSchema(): Observable<SchemaItemModel[]> {
        return this.platform.downloadPreset<SchemaItemModel[]>('settings_schema.json');
    }

    uploadPresets(model: PresetsModel): Observable<any> {
        return this.platform.uploadPreset(model, 'settings_data.json');
    }
}
