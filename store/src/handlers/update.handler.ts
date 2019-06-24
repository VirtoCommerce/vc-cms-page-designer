import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class UpdateHandler extends BaseHandler {
    readonly key = 'update';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        vm.source = msg.content;
        this.reloadBlock(vm.source).then((result: string) => {
            vm.htmlString = result;
            this.renderer.update(vm);
            this.renderer.select(vm);
            // var $: any = window['jQuery'];
            // $(".carousel-block").carousel();
        });
    }
}