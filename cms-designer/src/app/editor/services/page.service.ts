import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageModel } from '../models/page.model';
import { Observable } from 'rxjs';
import { SectionModel } from '../models/section.model';

@Injectable({
    providedIn: 'root'
})
export class PageService {
    constructor(private http: HttpClient) { }

    loadPage(): Observable<SectionModel[]> {
        return this.http.get<SectionModel[]>('data/page_data.json');
    }
}
