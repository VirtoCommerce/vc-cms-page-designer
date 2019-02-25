import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PlatformService } from '@app/services';
import { BlocksSchema } from '@shared/models';

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
