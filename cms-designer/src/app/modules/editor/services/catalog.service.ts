// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ApiUrlsService } from 'src/app/services/api-url.service';
// import { switchMap, map } from 'rxjs/operators';
// import { CategoryModel } from '../models';
// import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class CatalogService {

//     constructor(private urls: ApiUrlsService, private http: HttpClient) { }

//     getCategories(): Observable<CategoryModel[]> {
//         const storesUrl = this.urls.getStoresEndPoint();
//         const categoriesUrl = this.urls.getCategoriesEndPoint();
//         return this.http.get<any>(storesUrl).pipe(
//             switchMap(store => {
//                 const criterias = {
//                     responseGroup: 'withCategories',
//                     searchInChildren: true,
//                     catalogId: store.catalog
//                 };
//                 return this.http.post<any>(categoriesUrl, criterias).pipe(
//                     map(data => this.mapCategories(data)),
//                 );
//             })
//         );
//     }

//     private mapCategories(data) {
//         const list = data.listEntries.filter(x => x.isActive && x.type === 'category').map(x => <CategoryModel>{
//             id: x.id,
//             name: x.name,
//             path: x.path,
//             image: x.imageUrl
//         });
//         const plainTree = [];
//         const parents = list.filter(x => !x.path || !x.path.length);
//         this.fillRecursively(plainTree, parents, list, 0);
//         return plainTree;
//     }

//     private fillRecursively(result: CategoryModel[], parents: CategoryModel[], list: CategoryModel[], level: number) {
//         parents.forEach(parent => {
//             result.push({
//                 ...parent,
//                 name: Array.from({ length: level * 4 }, _ => '&nbsp;').join('') + parent.name
//             });
//             const children = list.filter(x => !!x.path && x.path.length > 0 && x.path[x.path.length - 1] === parent.name);
//             this.fillRecursively(result, children, list, level + 1);
//         });
//     }
// }
