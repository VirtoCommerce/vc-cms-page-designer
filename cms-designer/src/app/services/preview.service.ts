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

    page(page: PageModel, frameId: string) {
        this.send('page', page, frameId);
    }

    addOrUpdateBlock(block: SectionModel, frameId: string) {
        this.send('addOrUpdate', block, frameId);
    }

    removeBlock(block: SectionModel, frameId: string) {
        this.send('remove', block.id, frameId);
    }

    changeOrder(currentIndex: number, newIndex: number, frameId: string) {
        this.send('move', { currentIndex, newIndex }, frameId);
    }

    scrollTo(block: SectionModel, frameId: string) {
        this.send('scrollTo', { id: block.id }, frameId);
    }

    reload(frameId: string) {
        // план действий
        //  нужен второй айфрейм - shadow
        //  загрузка в shadow
        //  отображение display
        //  после срабатываения loaded сообщаем что страница загружена
        //  отправляем туда все блоки
        //  меняем айфреймы местами
        //  нужна обработка ошибок на всех этапах
        //  лоадер работает с самого начала, до подмены
        //  событие settings должно вызываться раньше чем page!!


        // const request = new HttpRequest('GET', '', {
        //     reportProgress: true,
        //     responseType: 'text'
        // });
        // this.http.request(request).pipe(
        //     map(event => this.getEventMessage(event)),
        //     tap(message => this.showProgress(message)),
        //     last(), // return last (completed) message to caller
        //     catchError(x => this.handleError(x))
        // ).subscribe(x => {
        //     const element = document.getElementById('preview');
        //     // (<HTMLIFrameElement>element).src = <string>this.urls.getStoreUrl(false);
        // });
        this.send('settings', {}, frameId);
    }

    toggleFrames(primaryId: string, secondaryId: string) {
        const primary = document.getElementById(primaryId);
        const secondary = document.getElementById(secondaryId);
        secondary.style.zIndex = '1';
        secondary.style.display = 'block';
        primary.style.zIndex = '0';
        primary.style.display = 'none';
    }

    private send(type: string, model: any, frameId: string) {
        console.log(type);
        const element = document.getElementById(frameId);
        if (element != null) {
            const target = (<HTMLIFrameElement>element).contentWindow;
            if (!!target) {
                const message = { type: type, content: model };
                try {
                    target.postMessage(message, environment.storeBaseUrl + environment.storePreviewPath);
                } catch (error) {
                    console.error('Preview unavailable. Reason: ', error);
                }
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
