import { Injectable } from '@angular/core';
import { PageModel } from '../models/page.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PreviewService {

    page(page: PageModel) {
        const element = document.getElementById('preview');
        if (element != null) {
            const target = (<HTMLIFrameElement>element).contentWindow;
            if (page && target) {
                const message = { type: 'page', page };
                target.postMessage(message, environment.storeUrl);
            }
        }


        // const message = { type: 'page', page };
        // const win = document.getElementById('preview').contentWindow;

        // win.postMessage(message, environment.storeUrl);


        // var message = { type: 'syncPageBlocks', cmsPage: $scope.cmsPage };

        // console.log(message);

        // var win = document.getElementById('preview').contentWindow;
        // win.postMessage(message, _storefrontUrl);

        // window.postMessage('cms-designer-page', page);


        /*****************************************/
        // window.addEventListener('message', function (e) {
        //     if (e.data && e.data.type) {
        //         if (e.data.type === 'sync') {
        //             syncCmsPage(e.data);
        //         }
        //     }
        // });
    }
}
