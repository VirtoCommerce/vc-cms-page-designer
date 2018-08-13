import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private http: HttpClient) { }

    loadData(): Observable<[any, any]> {
        return forkJoin(
            this.http.get('data/settings_data.json'),
            this.http.get('data/settings_schema.json')
        );
    }

}
