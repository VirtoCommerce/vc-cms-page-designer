import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BlockValuesModel } from 'src/app/modules/shared/models';

import { AppSettings } from './app.settings';

@Injectable({
    providedIn: 'root'
})
export class PreviewService {

    constructor() { }

    page(page: BlockValuesModel[], frameId: string) {
        this.send('page', page, frameId);
    }

    addOrUpdateBlock(block: BlockValuesModel, frameId: string) {
        this.send('addOrUpdate', block, frameId);
    }

    removeBlock(block: BlockValuesModel, frameId: string) {
        this.send('remove', block.id, frameId);
    }

    changeOrder(currentIndex: number, newIndex: number, frameId: string) {
        this.send('move', { currentIndex, newIndex }, frameId);
    }

    scrollTo(block: BlockValuesModel, frameId: string) {
        this.send('scrollTo', { id: block.id }, frameId);
    }

    reload(frameId: string) {
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
        const element = document.getElementById(frameId);
        if (element != null) {
            const target = (<HTMLIFrameElement>element).contentWindow;
            if (!!target) {
                const message = { type: type, content: model };
                try {
                    target.postMessage(message, AppSettings.storeBaseUrl + AppSettings.storePreviewPath);
                } catch (error) {
                    console.error('Preview unavailable. Reason: ', error);
                }
            }
        }
    }
}
