import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PresetsModel } from '../models/';
import { PlatformService } from 'src/app/services/platform.service';
import { BlockSchema } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private platform: PlatformService) { }

    loadPresets(): Observable<PresetsModel> {
        return this.platform.downloadPreset<PresetsModel>('settings_data.json');
    }

    loadSchema(): Observable<BlockSchema[]> {
        return this.platform.downloadPreset<BlockSchema[]>('settings_schema.json');
    }

    uploadPresets(model: PresetsModel): Observable<any> {
        return this.platform.uploadPreset(model);
    }

    uploadDraft(model: PresetsModel): Observable<any> {
        return this.platform.uploadDraftPreset(model);
    }
}
