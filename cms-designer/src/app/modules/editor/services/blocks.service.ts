import { PlatformService } from './../../../services/platform.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlocksSchema } from 'src/app/modules/shared/models/';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BlocksService {
    constructor(private platform: PlatformService) { }

    load(): Observable<BlocksSchema> {
        return this.platform.donwloadBlocksSchema().pipe(
            tap(schema => {
                Object.keys(schema).map(key => {
                    schema[key].type = key;
                });
            })
        );
    }
}
