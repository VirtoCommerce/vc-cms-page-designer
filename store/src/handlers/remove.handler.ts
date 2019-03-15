import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class RemoveHandler extends BaseHandler {
    readonly key = 'remove';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        const index = list.indexOf(vm);
        list.splice(index, 1);
        vm.element.remove();
        this.renderer.select();
    }
}