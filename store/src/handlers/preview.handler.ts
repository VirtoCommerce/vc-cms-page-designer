import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class PreviewHandler extends BaseHandler {
    readonly key = 'preview';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        if (!msg.content) {
            this.clearPreview(list);
        } else {
            const vm = this.createViewModel(msg.content);
            list.push(vm);
            this.reloadBlock(vm.source).then(result => {
                vm.htmlString = result;
                this.renderer.add(vm);
            });
        }
    }
}