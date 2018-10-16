import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlatformService } from 'src/app/services/platform.service';

import { SectionModel } from '../models';
import { environment } from 'src/environments/environment';
import { PageDescriptor } from 'src/app/models/page.descriptor';

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    constructor(private platform: PlatformService) { }

    downloadPage(params: PageDescriptor): Observable<SectionModel[]> {
        return this.platform.downloadModel<SectionModel[]>(params);
    }

    uploadPage(page: SectionModel[], params: PageDescriptor): Observable<any> {
        const index = params.path.lastIndexOf('/');
        const filename = index !== -1 ? params.path.substr(index + 1) : params.path;
        const uploadParams = {
            ...params,
            path: index === -1 ? '' : params.path.substr(0, index - 1)
        };
        return this.platform.uploadModel(page, uploadParams, filename);
    }
}
