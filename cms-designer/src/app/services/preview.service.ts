import { Injectable } from '@angular/core';
import { BlockValuesModel } from '@shared/models';

import { AppSettings } from './app.settings';

@Injectable({
    providedIn: 'root'
})
export class PreviewService {

    constructor() { }

    add(block: BlockValuesModel, frameId: string) {
        this.send('add', block, frameId);
    }

    update(block: BlockValuesModel, frameId: string) {
        this.send('update', block, frameId);
    }

    cloneBlock(source: number, destination: number, frameId: string) {
        this.send('clone', { source, destination }, frameId);
    }

    hide(block: BlockValuesModel, frameId: string) {
        this.send('hide', block, frameId);
    }

    show(block: BlockValuesModel, frameId: string) {
        this.send('show', block, frameId);
    }

    removeBlock(block: BlockValuesModel, frameId: string) {
        this.send('remove', { id: block.id }, frameId);
    }

    preview(block: BlockValuesModel, frameId: string) {
        this.send('preview', block, frameId);
    }

    changeOrder(currentIndex: number, newIndex: number, frameId: string) {
        this.send('swap', { currentIndex, newIndex }, frameId);
    }

    page(page: BlockValuesModel[], frameId: string) {
        const settings = page.find(x => x.type === 'settings');
        if (!!settings) {
            settings.url = window.location.protocol + '//' + window.location.hostname;
        }
        this.send('page', { blocks: page }, frameId);
    }

    reload(frameId: string) {
        this.send('reload', {}, frameId);
    }

    selectBlock(blockId: number, frameId: string) {
        this.send('select', { id: blockId }, frameId);
    }

    hover(block: BlockValuesModel, frameId: string) {
        this.send('hover', { id: block.id }, frameId);
    }

    /**
     * while frame is not rendered it will not execute own scripts
     * @param primaryId
     * @param secondaryId
     */
    toggleFrames(primaryId: string, secondaryId: string) {
        console.log('toggle', secondaryId, 'is primary now');
        if (!!primaryId) {
            const primary = document.getElementById(primaryId);
            primary.style.zIndex = '0';
            primary.style.display = 'none';
        }
        if (!!secondaryId) {
            const secondary = document.getElementById(secondaryId);
            secondary.style.zIndex = '1';
            secondary.style.display = 'block';
        }
    }

    private send(type: string, model: any, frameId: string) {
        const element = document.getElementById(frameId);
        if (element != null) {
            const target = (<HTMLIFrameElement>element).contentWindow;
            if (!!target) {
                const message = { type: type, content: model };
                try {
                    if (type !== 'hover') {
                        console.log(frameId, message);
                    }
                    target.postMessage(message, AppSettings.storeBaseUrl + AppSettings.storePreviewPath);
                } catch (error) {
                    console.error('Preview unavailable. Reason: ', error);
                }
            }
        }
    }
}
