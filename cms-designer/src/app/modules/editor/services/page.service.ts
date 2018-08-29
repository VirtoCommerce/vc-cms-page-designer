import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    availableTypes = [
        { type: 'text',                     name: 'Simple text' },
        { type: 'image',                    name: 'Simple image',               inactive: true },
        { type: 'image-with-text',          name: 'Image with text',            inactive: true },
        { type: 'image-with-text-overlay',  name: 'Image with text overlay',    inactive: true },
        { type: 'image-carousel',           name: 'Image carousel',             inactive: true },
        { type: 'textcolumns-with-images',  name: 'Text columns with images',   inactive: true },
        { type: 'images-layout',            name: 'Images layout',              inactive: true }
    ];


    constructor(private http: HttpClient) { }

    loadPage(): Observable<SectionModel[]> {
        return this.http.get<SectionModel[]>('data/page_data.json');
    }
}
