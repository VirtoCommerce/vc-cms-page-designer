import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SchemaItemModel } from '../models/schema-item.model';
import { PresetsModel } from '../models/presets.model';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private http: HttpClient) { }

    loadPresets(): Observable<PresetsModel> {
        return this.http.get<PresetsModel>('data/settings_data.json');
    }

    loadSchema(): Observable<SchemaItemModel[]> {
        return this.http.get<SchemaItemModel[]>('data/settings_schema.json');
    }

}
