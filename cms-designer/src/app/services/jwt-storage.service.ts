import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtStorageService {

    private static readonly STORAGEKEY = 'ls.authenticationData';

    getToken() {
        return this.getInfo().token;
    }

    getRefreshToken() {
        return this.getInfo().refreshToken;
    }

    save(info) {
        const data = {
            expiresAt: Date.now() + info.expires_in * 1000,
            refreshToken: info.refresh_token,
            token: info.access_token,
            userName: info.userName
        };
        localStorage.setItem(JwtStorageService.STORAGEKEY, JSON.stringify(data));
        return data;
    }

    private getInfo() {
        try {
            const jwt = localStorage.getItem(JwtStorageService.STORAGEKEY);
            if (jwt) {
                const info = JSON.parse(jwt);
                return info;
            }
        } catch (e) {
            console.log('wrong auth token');
        }
        return {};
    }
}
