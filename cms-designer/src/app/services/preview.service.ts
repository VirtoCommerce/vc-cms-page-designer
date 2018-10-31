import { Injectable } from '@angular/core';
import { PageModel, SectionModel } from '../modules/editor/models';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { map, tap, last, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiUrlsService } from './api-url.service';

@Injectable({
    providedIn: 'root'
})
export class PreviewService {

    constructor(private http: HttpClient, private urls: ApiUrlsService) { }

    page(page: PageModel) {
        this.send('page', page);
    }

    addOrUpdateBlock(block: SectionModel) {
        this.send('addOrUpdate', block);
    }

    removeBlock(block: SectionModel) {
        this.send('remove', block.id);
    }

    changeOrder(currentIndex: number, newIndex: number) {
        this.send('move', { currentIndex, newIndex });
    }

    scrollTo(block: SectionModel) {
        this.send('scrollTo', { id: block.id });
    }

    reload() {
        const request = new HttpRequest('GET', '', {
            reportProgress: true,
            responseType: 'text'
        });
        this.http.request(request).pipe(
            map(event => this.getEventMessage(event)),
            tap(message => this.showProgress(message)),
            last(), // return last (completed) message to caller
            catchError(x => this.handleError(x))
        ).subscribe(x => {
            const element = document.getElementById('preview');
            // (<HTMLIFrameElement>element).src = <string>this.urls.getStoreUrl(false);
        });
        // this.send('settings', {});
    }

    private getEventMessage(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.DownloadProgress:
                // Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `percent done ${percentDone}`;

            case HttpEventType.Response:
                return `Page completely downloaded`;

            default:
                return `event received: ${event.type}`;
        }
    }

    private send(type: string, model: any) {
        const element = document.getElementById('preview');
        if (element != null) {
            const target = (<HTMLIFrameElement>element).contentWindow;
            if (!!target) {
                const message = { type: type, content: model };
                target.postMessage(message, environment.storeBaseUrl + environment.storePreviewPath);
            }
        }
    }

    private handleError(error: any) {
        console.log('error occured', error);
        return of(error);
    }

    private showProgress(message: string) {
        console.log(message);
    }
}
