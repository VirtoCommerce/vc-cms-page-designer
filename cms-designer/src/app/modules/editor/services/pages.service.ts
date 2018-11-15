import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlatformService } from 'src/app/services/platform.service';
import { PageModel } from './../models/page.model';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    constructor(private platform: PlatformService) { }

    downloadPage(): Observable<PageModel> {
        return this.platform.downloadPage();
    }

    uploadPage(page: PageModel): Observable<any> {
        return this.platform.uploadPage(page);
    }
}
