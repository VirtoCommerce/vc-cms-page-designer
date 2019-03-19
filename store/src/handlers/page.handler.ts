import { ServiceLocator } from './../service-locator';
import { Environment } from './../environment';
import { BaseHandler } from "./base.handler";
import { BaseMessage, MessageContent } from "../models";
import { BlockViewModel } from "../block.view-model";

export class PageHandler extends BaseHandler {
    readonly key = 'page';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        console.log(msg);
        const blocks = msg.content.blocks;
        blocks.forEach(x => {
            const vm = this.createViewModel(x);
            list.push(vm);
        });
        Promise.all(list.map(x => {
            const promise = this.reloadBlock(x.source).then(html => {
                x.htmlString = html;
                return html;
            });
            return promise;
        })).then(() => {
            list.forEach(x => {
                this.renderer.add(x);
            });
            ServiceLocator.getMessages().renderComplete();
        });
    }
}