import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilesService {

    private apiCreateEndpoint = '';

    constructor(private http: HttpClient) { }

    upload(file: File): Observable<string> {
        // const request = new HttpRequest('POST', this.apiCreateEndpoint, {}, {
        //     reportProgress: true
        // });
        // return this.http.request(request);
        return of('https://virtocommerce.com/themes/assets/bg-enterprise.jpg');
    }
}
