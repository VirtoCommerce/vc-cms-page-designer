import { Injectable } from '@angular/core';
import { PageModel, SectionModel } from '../models';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PreviewService {

    page(page: PageModel) {
        this.send('page', page);
    }

    addOrUpdateBlock(block: SectionModel) {
        this.send('addOrUpdate', block);
    }

    removeBlock(block: SectionModel) {
        this.send('remove', block.id);
    }

    private send(type: string, model: any) {
        const element = document.getElementById('preview');
        if (element != null) {
            const target = (<HTMLIFrameElement>element).contentWindow;
            if (model && target) {
                const message = { type: type, content: model };
                target.postMessage(message, environment.storeUrl);
            }
        }
    }
}
