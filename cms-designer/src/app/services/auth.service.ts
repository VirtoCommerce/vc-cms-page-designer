import { ApiUrlsService } from './api-url.service';
import { JwtStorageService } from './jwt-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private jwt: JwtStorageService, private urls: ApiUrlsService) { }

    refreshToken(): Observable<any> {
        const token = this.jwt.getRefreshToken();
        if (token) {
            const data = 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(token);
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };
            return this.http.post<any>(this.urls.getTokenUrl(), data, options).pipe(
                map(info => {
                    if (info && info.access_token) {
                        return this.jwt.save(info);
                    }
                    return info;
                })
            );
        }
    }
}
