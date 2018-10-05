import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageModel } from '../models/page.model';
import { SectionModel } from '../models/section.model';
import { BlockType } from '../models/block-type.model';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    availableTypes: BlockType[] = [
        { type: 'text',                     name: 'Simple text' },
        { type: 'image',                    name: 'Simple image' },
        { type: 'image-with-text',          name: 'Image with text' },
        { type: 'image-with-text-overlay',  name: 'Image with text overlay',    inactive: true },  // still empty control
        { type: 'image-carousel',           name: 'Image carousel',             inactive: false }, // added to system, but still empty
        { type: 'textcolumns-with-images',  name: 'Text columns with images',   inactive: true },
        { type: 'images-layout',            name: 'Images layout',              inactive: true }
    ];

    constructor(private http: HttpClient) { }

    loadPage(): Observable<SectionModel[]> {
        return this.http.get<SectionModel[]>('data/page_data.json');
    }
}
