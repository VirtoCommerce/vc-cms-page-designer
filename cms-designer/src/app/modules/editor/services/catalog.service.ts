import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from 'src/app/services/api-url.service';
import { switchMap } from 'rxjs/operators';
import { CategoryModel } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    constructor(private urls: ApiUrlsService, private http: HttpClient) { }

    getCategories(): Observable<CategoryModel[]> {
        const storesUrl = this.urls.getStoresEndPoint();
        const categoriesUrl = this.urls.getCategoriesEndPoint();
        return this.http.get<any>(storesUrl).pipe(
            switchMap(x => {
                const criterias = {
                    responseGroup: 'withCategories',
                    searchInChildren: true,
                    catalogId: x.catalog

                };
                return this.http.post<CategoryModel[]>(categoriesUrl, criterias);
            })
        );
    }
}
