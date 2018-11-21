import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlatformService } from 'src/app/services/platform.service';
import { PageModel } from './../models/page.model';
import { BlockValuesModel } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    constructor(private platform: PlatformService) { }

    downloadPage(): Observable<BlockValuesModel[]> {
        return this.platform.downloadPage();
    }

    uploadPage(page: BlockValuesModel[]): Observable<any> {
        return this.platform.uploadPage(page);
    }
}
