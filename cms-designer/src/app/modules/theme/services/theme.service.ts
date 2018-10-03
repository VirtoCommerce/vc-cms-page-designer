import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ThemeItemModel } from '../models/theme-item.model';
import { PresetsModel } from '../models/presets.model';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private http: HttpClient) { }

    loadPresets(): Observable<PresetsModel> {
        return this.http.get<PresetsModel>('data/settings_data.json');
    }

    loadSchema(): Observable<ThemeItemModel[]> {
        return this.http.get<ThemeItemModel[]>('data/settings_schema.json');
    }

}
