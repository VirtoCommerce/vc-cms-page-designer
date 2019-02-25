import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatformService } from '@app/services';
import { BlockValuesModel } from '@shared/models';

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
