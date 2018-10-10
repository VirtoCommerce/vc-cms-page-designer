import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';
import { BlockType } from '../models/block-type.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {

    constructor(private http: HttpClient) { }

    loadPage(): Observable<SectionModel[]> {
        return this.http.get<SectionModel[]>('data/page_data.json');
    }

    uploadPage(): Observable<any> {
        return null;
    }
}
