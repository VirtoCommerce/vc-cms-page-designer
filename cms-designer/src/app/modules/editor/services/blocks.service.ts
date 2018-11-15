import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BlocksSchema } from 'src/app/modules/shared/models/';

@Injectable({
    providedIn: 'root'
})
export class BlocksService {
    constructor(private http: HttpClient) { }

    load(): Observable<BlocksSchema> {
        return this.http.get<BlocksSchema>('/data/blocks_schema.json').pipe(
            tap(schema => {
                Object.keys(schema).map(key => {
                    schema[key].type = key;
                });
                console.log(schema);
            })
        );
    }
}
