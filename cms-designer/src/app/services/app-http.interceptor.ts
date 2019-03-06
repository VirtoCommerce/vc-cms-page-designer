import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        try {
            const jwt = localStorage.getItem('ls.authenticationData');
            if (jwt) {
                const info = JSON.parse(jwt);
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${info.token}`
                    }
                });
            }
        } catch (e) {
            console.log('wrong auth token');
        }
        return next.handle(request);
    }
}
