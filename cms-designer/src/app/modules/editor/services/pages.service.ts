import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlatformService } from 'src/app/services/platform.service';

import { SectionModel } from '../models';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    constructor(private platform: PlatformService) { }

    downloadPage(): Observable<SectionModel[]> {
        return this.platform.downloadPage();
    }

    uploadPage(page: SectionModel[]): Observable<any> {
        return this.platform.uploadPage(page);
    }
}
