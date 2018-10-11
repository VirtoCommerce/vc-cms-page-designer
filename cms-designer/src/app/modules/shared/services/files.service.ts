import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FilesService {

    constructor(private http: HttpClient) { }

    uploadFile(file: File, name: string): Observable<string> {
        const assetEndpoint = 'api/platform/assets';
        const url = `${environment.platformUrl}/${assetEndpoint}?folderUrl=blogs&name=${name}&api_key=${environment.apiKey}`;
        const form = new FormData();

        form.append('uploadedFile', file, name);

        return this.http.post<FileDescriptor[]>(url, form).pipe(
            map(x => x[0].url)
        );
    }

}
interface FileDescriptor {
    contentType: string;
    fileName: string;
    key: string;
    mimeType: string;
    name: string;
    relativeUrl: string;
    size: number;
    url: string;
}
