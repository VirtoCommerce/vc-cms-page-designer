import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageModel } from '../models/page.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageService {
    constructor(private http: HttpClient) { }

    loadPage(): Observable<PageModel> {
        return this.http.get<PageModel>('data/page_data.json');
    }
}
